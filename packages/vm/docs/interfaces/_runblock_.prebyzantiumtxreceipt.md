[@fourtwentyjs/vm](../README.md) › ["runBlock"](../modules/_runblock_.md) › [PreByzantiumTxReceipt](_runblock_.prebyzantiumtxreceipt.md)

# Interface: PreByzantiumTxReceipt

Pre-Byzantium receipt type with a field
for the intermediary state root

## Hierarchy

* TxReceipt

  ↳ **PreByzantiumTxReceipt**

## Index

### Properties

* [bitvector](_runblock_.prebyzantiumtxreceipt.md#bitvector)
* [smokeUsed](_runblock_.prebyzantiumtxreceipt.md#smokeused)
* [logs](_runblock_.prebyzantiumtxreceipt.md#logs)
* [stateRoot](_runblock_.prebyzantiumtxreceipt.md#stateroot)

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

###  stateRoot

• **stateRoot**: *Buffer*

*Defined in [runBlock.ts:93](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L93)*

Intermediary state root
