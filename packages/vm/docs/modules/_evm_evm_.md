[@fourtwentyjs/vm](../README.md) › ["evm/evm"](_evm_evm_.md)

# Module: "evm/evm"

## Index

### Interfaces

* [EVMResult](../interfaces/_evm_evm_.evmresult.md)
* [ExecResult](../interfaces/_evm_evm_.execresult.md)
* [NewContractEvent](../interfaces/_evm_evm_.newcontractevent.md)

### Functions

* [COOGResult](_evm_evm_.md#coogresult)
* [OOGResult](_evm_evm_.md#oogresult)
* [VmErrorResult](_evm_evm_.md#vmerrorresult)

## Functions

###  COOGResult

▸ **COOGResult**(`smokeUsedCreateCode`: BN): *[ExecResult](../interfaces/_evm_evm_.execresult.md)*

*Defined in [evm/evm.ts:86](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/evm.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`smokeUsedCreateCode` | BN |

**Returns:** *[ExecResult](../interfaces/_evm_evm_.execresult.md)*

___

###  OOGResult

▸ **OOGResult**(`smokeLimit`: BN): *[ExecResult](../interfaces/_evm_evm_.execresult.md)*

*Defined in [evm/evm.ts:78](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/evm.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`smokeLimit` | BN |

**Returns:** *[ExecResult](../interfaces/_evm_evm_.execresult.md)*

___

###  VmErrorResult

▸ **VmErrorResult**(`error`: [VmError](../classes/_exceptions_.vmerror.md), `smokeUsed`: BN): *[ExecResult](../interfaces/_evm_evm_.execresult.md)*

*Defined in [evm/evm.ts:94](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/evm.ts#L94)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | [VmError](../classes/_exceptions_.vmerror.md) |
`smokeUsed` | BN |

**Returns:** *[ExecResult](../interfaces/_evm_evm_.execresult.md)*
