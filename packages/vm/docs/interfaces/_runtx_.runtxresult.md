[@fourtwentyjs/vm](../README.md) › ["runTx"](../modules/_runtx_.md) › [RunTxResult](_runtx_.runtxresult.md)

# Interface: RunTxResult

Execution result of a transaction

## Hierarchy

* [EVMResult](_evm_evm_.evmresult.md)

  ↳ **RunTxResult**

## Index

### Properties

* [amountSpent](_runtx_.runtxresult.md#amountspent)
* [bloom](_runtx_.runtxresult.md#bloom)
* [createdAddress](_runtx_.runtxresult.md#optional-createdaddress)
* [execResult](_runtx_.runtxresult.md#execresult)
* [smokeRefund](_runtx_.runtxresult.md#optional-smokerefund)
* [smokeUsed](_runtx_.runtxresult.md#smokeused)

## Properties

###  amountSpent

• **amountSpent**: *BN*

*Defined in [runTx.ts:43](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runTx.ts#L43)*

The amount of ether used by this transaction

___

###  bloom

• **bloom**: *Bloom*

*Defined in [runTx.ts:39](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runTx.ts#L39)*

Bloom filter resulted from transaction

___

### `Optional` createdAddress

• **createdAddress**? : *Address*

*Inherited from [RunTxResult](_runtx_.runtxresult.md).[createdAddress](_runtx_.runtxresult.md#optional-createdaddress)*

*Defined in [evm/evm.ts:30](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/evm.ts#L30)*

Address of created account durint transaction, if any

___

###  execResult

• **execResult**: *[ExecResult](_evm_evm_.execresult.md)*

*Inherited from [RunTxResult](_runtx_.runtxresult.md).[execResult](_runtx_.runtxresult.md#execresult)*

*Defined in [evm/evm.ts:34](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/evm.ts#L34)*

Contains the results from running the code, if any, as described in [runCode](../classes/_index_.vm.md#runcode)

___

### `Optional` smokeRefund

• **smokeRefund**? : *BN*

*Defined in [runTx.ts:47](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runTx.ts#L47)*

The amount of smoke as that was refunded during the transaction (i.e. `smokeUsed = totalSmokeConsumed - smokeRefund`)

___

###  smokeUsed

• **smokeUsed**: *BN*

*Inherited from [RunTxResult](_runtx_.runtxresult.md).[smokeUsed](_runtx_.runtxresult.md#smokeused)*

*Defined in [evm/evm.ts:26](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/evm.ts#L26)*

Amount of smoke used by the transaction
