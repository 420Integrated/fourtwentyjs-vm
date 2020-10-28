import {
  Account,
  Address,
  BN,
  generateAddress,
  generateAddress2,
  KECCAK256_NULL,
  MAX_INTEGER,
} from 'fourtwentyjs-util'
import { Block } from '@fourtwentyjs/block'
import { ERROR, VmError } from '../exceptions'
import { StateManager } from '../state/index'
import { getPrecompile, PrecompileFunc } from './precompiles'
import TxContext from './txContext'
import Message from './message'
import EEI from './eei'
import { default as Interpreter, InterpreterOpts, RunState } from './interpreter'

/**
 * Result of executing a message via the [[EVM]].
 */
export interface EVMResult {
  /**
   * Amount of smoke used by the transaction
   */
  smokeUsed: BN
  /**
   * Address of created account durint transaction, if any
   */
  createdAddress?: Address
  /**
   * Contains the results from running the code, if any, as described in [[runCode]]
   */
  execResult: ExecResult
}

/**
 * Result of executing a call via the [[EVM]].
 */
export interface ExecResult {
  runState?: RunState
  /**
   * Description of the exception, if any occured
   */
  exceptionError?: VmError
  /**
   * Amount of smoke left
   */
  smoke?: BN
  /**
   * Amount of smoke the code used to run
   */
  smokeUsed: BN
  /**
   * Return value from the contract
   */
  returnValue: Buffer
  /**
   * Array of logs that the contract emitted
   */
  logs?: any[]
  /**
   * A map from the accounts that have self-destructed to the addresses to send their funds to
   */
  selfdestruct?: { [k: string]: Buffer }
  /**
   * Total amount of smoke to be refunded from all nested calls.
   */
  smokeRefund?: BN
}

export interface NewContractEvent {
  address: Address
  // The deployment code
  code: Buffer
}

export function OOGResult(smokeLimit: BN): ExecResult {
  return {
    returnValue: Buffer.alloc(0),
    smokeUsed: smokeLimit,
    exceptionError: new VmError(ERROR.OUT_OF_GAS),
  }
}
// CodeDeposit OOG Result
export function COOGResult(smokeUsedCreateCode: BN): ExecResult {
  return {
    returnValue: Buffer.alloc(0),
    smokeUsed: smokeUsedCreateCode,
    exceptionError: new VmError(ERROR.CODESTORE_OUT_OF_GAS),
  }
}

export function VmErrorResult(error: VmError, smokeUsed: BN): ExecResult {
  return {
    returnValue: Buffer.alloc(0),
    smokeUsed: smokeUsed,
    exceptionError: error,
  }
}

/**
 * EVM is responsible for executing an EVM message fully
 * (including any nested calls and creates), processing the results
 * and storing them to state (or discarding changes in case of exceptions).
 * @ignore
 */
export default class EVM {
  _vm: any
  _state: StateManager
  _tx: TxContext
  _block: Block
  /**
   * Amount of smoke to refund from deleting storage values
   */
  _refund: BN

  constructor(vm: any, txContext: TxContext, block: Block) {
    this._vm = vm
    this._state = this._vm.stateManager
    this._tx = txContext
    this._block = block
    this._refund = new BN(0)
  }

  /**
   * Executes an EVM message, determining whether it's a call or create
   * based on the `to` address. It checkpoints the state and reverts changes
   * if an exception happens during the message execution.
   */
  async executeMessage(message: Message): Promise<EVMResult> {
    await this._vm._emit('beforeMessage', message)

    await this._state.checkpoint()

    let result
    if (message.to) {
      result = await this._executeCall(message)
    } else {
      result = await this._executeCreate(message)
    }
    // TODO: Move `smokeRefund` to a tx-level result object
    // instead of `ExecResult`.
    result.execResult.smokeRefund = this._refund.clone()

    const err = result.execResult.exceptionError
    if (err) {
      if (this._vm._common.gteHardfork('homestead') || err.error != ERROR.CODESTORE_OUT_OF_GAS) {
        result.execResult.logs = []
        await this._state.revert()
      } else {
        // we are in chainstart and the error was the code deposit error
        // we do like nothing happened.
        await this._state.commit()
      }
    } else {
      await this._state.commit()
    }

    await this._vm._emit('afterMessage', result)

    return result
  }

  async _executeCall(message: Message): Promise<EVMResult> {
    const account = await this._state.getAccount(message.caller)
    // Reduce tx value from sender
    if (!message.delegatecall) {
      await this._reduceSenderBalance(account, message)
    }
    // Load `to` account
    const toAccount = await this._state.getAccount(message.to)
    // Add tx value to the `to` account
    let errorMessage
    if (!message.delegatecall) {
      try {
        await this._addToBalance(toAccount, message)
      } catch (e) {
        errorMessage = e
      }
    }

    // Load code
    await this._loadCode(message)
    // Exit early if there's no code or value transfer overflowed
    if (!message.code || message.code.length === 0 || errorMessage) {
      return {
        smokeUsed: new BN(0),
        execResult: {
          smokeUsed: new BN(0),
          exceptionError: errorMessage, // Only defined if addToBalance failed
          returnValue: Buffer.alloc(0),
        },
      }
    }

    let result: ExecResult
    if (message.isCompiled) {
      result = await this.runPrecompile(
        message.code as PrecompileFunc,
        message.data,
        message.smokeLimit
      )
    } else {
      result = await this.runInterpreter(message)
    }

    return {
      smokeUsed: result.smokeUsed,
      execResult: result,
    }
  }

  async _executeCreate(message: Message): Promise<EVMResult> {
    const account = await this._state.getAccount(message.caller)
    // Reduce tx value from sender
    await this._reduceSenderBalance(account, message)

    message.code = message.data
    message.data = Buffer.alloc(0)
    message.to = await this._generateAddress(message)
    let toAccount = await this._state.getAccount(message.to)
    // Check for collision
    if ((toAccount.nonce && toAccount.nonce.gtn(0)) || !toAccount.codeHash.equals(KECCAK256_NULL)) {
      return {
        smokeUsed: message.smokeLimit,
        createdAddress: message.to,
        execResult: {
          returnValue: Buffer.alloc(0),
          exceptionError: new VmError(ERROR.CREATE_COLLISION),
          smokeUsed: message.smokeLimit,
        },
      }
    }

    await this._state.clearContractStorage(message.to)

    const newContractEvent: NewContractEvent = {
      address: message.to,
      code: message.code,
    }

    await this._vm._emit('newContract', newContractEvent)

    toAccount = await this._state.getAccount(message.to)
    // EIP-161 on account creation and CREATE execution
    if (this._vm._common.gteHardfork('spuriousDragon')) {
      toAccount.nonce.iaddn(1)
    }

    // Add tx value to the `to` account
    let errorMessage
    try {
      await this._addToBalance(toAccount, message)
    } catch (e) {
      errorMessage = e
    }

    // Exit early if there's no contract code or value transfer overflowed
    if (!message.code || message.code.length === 0 || errorMessage) {
      return {
        smokeUsed: new BN(0),
        createdAddress: message.to,
        execResult: {
          smokeUsed: new BN(0),
          exceptionError: errorMessage, // only defined if addToBalance failed
          returnValue: Buffer.alloc(0),
        },
      }
    }

    let result = await this.runInterpreter(message)

    // fee for size of the return value
    let totalSmoke = result.smokeUsed
    let returnFee = new BN(0)
    if (!result.exceptionError) {
      returnFee = new BN(result.returnValue.length).imuln(
        this._vm._common.param('smokePrices', 'createData')
      )
      totalSmoke = totalSmoke.add(returnFee)
    }

    // Check for SpuriousDragon EIP-170 code size limit
    let allowedCodeSize = true
    if (
      this._vm._common.gteHardfork('spuriousDragon') &&
      result.returnValue.length > this._vm._common.param('vm', 'maxCodeSize')
    ) {
      allowedCodeSize = false
    }
    // If enough smoke and allowed code size
    if (
      totalSmoke.lte(message.smokeLimit) &&
      (this._vm._allowUnlimitedContractSize || allowedCodeSize)
    ) {
      result.smokeUsed = totalSmoke
    } else {
      if (this._vm._common.gteHardfork('homestead')) {
        result = { ...result, ...OOGResult(message.smokeLimit) }
      } else {
        // we are in Frontier
        if (totalSmoke.sub(returnFee).lte(message.smokeLimit)) {
          // we cannot pay the code deposit fee (but the deposit code actually did run)
          result = { ...result, ...COOGResult(totalSmoke.sub(returnFee)) }
        } else {
          result = { ...result, ...OOGResult(message.smokeLimit) }
        }
      }
    }

    // Save code if a new contract was created
    if (!result.exceptionError && result.returnValue && result.returnValue.toString() !== '') {
      await this._state.putContractCode(message.to, result.returnValue)
    }

    return {
      smokeUsed: result.smokeUsed,
      createdAddress: message.to,
      execResult: result,
    }
  }

  /**
   * Starts the actual bytecode processing for a CALL or CREATE, providing
   * it with the [[EEI]].
   */
  async runInterpreter(message: Message, opts: InterpreterOpts = {}): Promise<ExecResult> {
    const env = {
      blockchain: this._vm.blockchain, // Only used in BLOCKHASH
      address: message.to || Address.zero(),
      caller: message.caller || Address.zero(),
      callData: message.data || Buffer.from([0]),
      callValue: message.value || new BN(0),
      code: message.code as Buffer,
      isStatic: message.isStatic || false,
      depth: message.depth || 0,
      smokePrice: this._tx.smokePrice,
      origin: this._tx.origin || message.caller || Address.zero(),
      block: this._block || new Block(),
      contract: await this._state.getAccount(message.to || Address.zero()),
      codeAddress: message.codeAddress,
    }
    const eei = new EEI(env, this._state, this, this._vm._common, message.smokeLimit.clone())
    if (message.selfdestruct) {
      eei._result.selfdestruct = message.selfdestruct
    }

    const oldRefund = this._refund.clone()
    const interpreter = new Interpreter(this._vm, eei)
    const interpreterRes = await interpreter.run(message.code as Buffer, opts)

    let result = eei._result
    let smokeUsed = message.smokeLimit.sub(eei._smokeLeft)
    if (interpreterRes.exceptionError) {
      if (interpreterRes.exceptionError.error !== ERROR.REVERT) {
        smokeUsed = message.smokeLimit
      }

      // Clear the result on error
      result = {
        ...result,
        logs: [],
        selfdestruct: {},
      }
      // Revert smoke refund if message failed
      this._refund = oldRefund
    }

    return {
      ...result,
      runState: {
        ...interpreterRes.runState!,
        ...result,
        ...eei._env,
      },
      exceptionError: interpreterRes.exceptionError,
      smoke: eei._smokeLeft,
      smokeUsed,
      returnValue: result.returnValue ? result.returnValue : Buffer.alloc(0),
    }
  }

  /**
   * Returns code for precompile at the given address, or undefined
   * if no such precompile exists.
   */
  getPrecompile(address: Address): PrecompileFunc {
    return getPrecompile(address, this._vm._common)
  }

  /**
   * Executes a precompiled contract with given data and smoke limit.
   */
  runPrecompile(
    code: PrecompileFunc,
    data: Buffer,
    smokeLimit: BN
  ): Promise<ExecResult> | ExecResult {
    if (typeof code !== 'function') {
      throw new Error('Invalid precompile')
    }

    const opts = {
      data,
      smokeLimit,
      _common: this._vm._common,
      _VM: this._vm,
    }

    return code(opts)
  }

  async _loadCode(message: Message): Promise<void> {
    if (!message.code) {
      const precompile = this.getPrecompile(message.codeAddress)
      if (precompile) {
        message.code = precompile
        message.isCompiled = true
      } else {
        message.code = await this._state.getContractCode(message.codeAddress)
        message.isCompiled = false
      }
    }
  }

  async _generateAddress(message: Message): Promise<Address> {
    let addr
    if (message.salt) {
      addr = generateAddress2(message.caller.buf, message.salt, message.code as Buffer)
    } else {
      const acc = await this._state.getAccount(message.caller)
      const newNonce = acc.nonce.subn(1)
      addr = generateAddress(message.caller.buf, newNonce.toArrayLike(Buffer))
    }
    return new Address(addr)
  }

  async _reduceSenderBalance(account: Account, message: Message): Promise<void> {
    account.balance.isub(message.value)
    return this._state.putAccount(message.caller, account)
  }

  async _addToBalance(toAccount: Account, message: Message): Promise<void> {
    const newBalance = toAccount.balance.add(message.value)
    if (newBalance.gt(MAX_INTEGER)) {
      throw new VmError(ERROR.VALUE_OVERFLOW)
    }
    toAccount.balance = newBalance
    // putAccount as the nonce may have changed for contract creation
    return this._state.putAccount(message.to, toAccount)
  }

  async _touchAccount(address: Address): Promise<void> {
    const account = await this._state.getAccount(address)
    return this._state.putAccount(address, account)
  }
}
