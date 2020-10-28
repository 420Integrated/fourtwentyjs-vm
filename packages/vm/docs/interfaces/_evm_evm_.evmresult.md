[@fourtwentyjs/vm](../README.md) › ["evm/evm"](../modules/_evm_evm_.md) › [EVMResult](_evm_evm_.evmresult.md)

# Interface: EVMResult

Result of executing a message via the [[EVM]].

## Hierarchy

* **EVMResult**

  ↳ [RunTxResult](_runtx_.runtxresult.md)

## Index

### Properties

* [createdAddress](_evm_evm_.evmresult.md#optional-createdaddress)
* [execResult](_evm_evm_.evmresult.md#execresult)
* [smokeUsed](_evm_evm_.evmresult.md#smokeused)

## Properties

### `Optional` createdAddress

• **createdAddress**? : *Address*

*Defined in [evm/evm.ts:30](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/evm.ts#L30)*

Address of created account durint transaction, if any

___

###  execResult

• **execResult**: *[ExecResult](_evm_evm_.execresult.md)*

*Defined in [evm/evm.ts:34](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/evm.ts#L34)*

Contains the results from running the code, if any, as described in [runCode](../classes/_index_.vm.md#runcode)

___

###  smokeUsed

• **smokeUsed**: *BN*

*Defined in [evm/evm.ts:26](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/evm.ts#L26)*

Amount of smoke used by the transaction
