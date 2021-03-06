/*

This is the core of the 420coin Virtual Machine (EVM or just VM).

NOTES:

stack items are lazily duplicated.
So you must never directly change a buffer from the stack,
instead you should `copy` it first

not all stack items are 32 bytes, so if the operation relies on the stack
item length then you must use utils.pad(<item>, 32) first.
*/
import { Address, BN } from 'fourtwentyjs-util'
import { Block } from '@fourtwentyjs/block'
import VM from './index'
import TxContext from './evm/txContext'
import Message from './evm/message'
import { default as EVM, ExecResult } from './evm/evm'

/**
 * Options for the [[runCode]] method.
 */
export interface RunCodeOpts {
  /**
   * The [`Block`](https://github.com/420integrated/fourtwentyjs-block) the `tx` belongs to. If omitted a blank block will be used
   */
  block?: Block
  evm?: EVM
  txContext?: TxContext
  smokePrice?: BN
  /**
   * The address where the call originated from. Defaults to the zero address.
   */
  origin?: Address
  message?: Message
  /**
   * The address that ran this code. Defaults to the zero address.
   */
  caller?: Address
  /**
   * The EVM code to run
   */
  code?: Buffer
  /**
   * The input data
   */
  data?: Buffer
  /**
   * Smoke limit
   */
  smokeLimit?: BN
  /**
   * The value in ether that is being sent to `opt.address`. Defaults to `0`
   */
  value?: BN
  depth?: number
  isStatic?: boolean
  selfdestruct?: { [k: string]: boolean }
  /**
   * The address of the account that is executing this code. Defaults to the zero address.
   */
  address?: Address
  /**
   * The initial program counter. Defaults to `0`
   */
  pc?: number
}

/**
 * @ignore
 */
export default function runCode(this: VM, opts: RunCodeOpts): Promise<ExecResult> {
  if (!opts.block) {
    opts.block = new Block()
  }

  // Backwards compatibility
  if (!opts.txContext) {
    opts.txContext = new TxContext(
      opts.smokePrice || new BN(0),
      opts.origin || opts.caller || Address.zero()
    )
  }
  if (!opts.message) {
    opts.message = new Message({
      code: opts.code,
      data: opts.data,
      smokeLimit: opts.smokeLimit,
      to: opts.address || Address.zero(),
      caller: opts.caller,
      value: opts.value,
      depth: opts.depth || 0,
      selfdestruct: opts.selfdestruct || {},
      isStatic: opts.isStatic || false,
    })
  }

  let evm = opts.evm
  if (!evm) {
    evm = new EVM(this, opts.txContext, opts.block)
  }

  return evm.runInterpreter(opts.message, { pc: opts.pc })
}
