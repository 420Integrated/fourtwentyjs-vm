[@fourtwentyjs/vm](../README.md) › ["runBlock"](../modules/_runblock_.md) › [PostByzantiumTxReceipt](_runblock_.postbyzantiumtxreceipt.md)

# Interface: PostByzantiumTxReceipt

Receipt type for Byzantium and beyond replacing the intermediary
state root field with a status code field (EIP-658)

## Hierarchy

* TxReceipt

  ↳ **PostByzantiumTxReceipt**

## Index

### Properties

* [bitvector](_runblock_.postbyzantiumtxreceipt.md#bitvector)
* [smokeUsed](_runblock_.postbyzantiumtxreceipt.md#smokeused)
* [logs](_runblock_.postbyzantiumtxreceipt.md#logs)
* [status](_runblock_.postbyzantiumtxreceipt.md#status)

## Properties

###  bitvector

• **bitvector**: *Buffer*

*Inherited from [PreByzantiumTxReceipt](_runblock_.prebyzantiumtxreceipt.md).[bitvector](_runblock_.prebyzantiumtxreceipt.md#bitvector)*

*Defined in [runBlock.ts:78](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L78)*

Bloom bitvector

___

###  smokeUsed

• **smokeUsed**: *Buffer*

*Inherited from [PreByzantiumTxReceipt](_runblock_.prebyzantiumtxreceipt.md).[smokeUsed](_runblock_.prebyzantiumtxreceipt.md#smokeused)*

*Defined in [runBlock.ts:74](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L74)*

Smoke used

___

###  logs

• **logs**: *any[]*

*Inherited from [PreByzantiumTxReceipt](_runblock_.prebyzantiumtxreceipt.md).[logs](_runblock_.prebyzantiumtxreceipt.md#logs)*

*Defined in [runBlock.ts:82](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L82)*

Logs emitted

___

###  status

• **status**: *0 | 1*

*Defined in [runBlock.ts:104](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L104)*

Status of transaction, `1` if successful, `0` if an exception occured
