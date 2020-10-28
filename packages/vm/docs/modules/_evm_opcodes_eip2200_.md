[@fourtwentyjs/vm](../README.md) › ["evm/opcodes/EIP2200"](_evm_opcodes_eip2200_.md)

# Module: "evm/opcodes/EIP2200"

## Index

### Functions

* [updateSstoreSmokeEIP2200](_evm_opcodes_eip2200_.md#updatesstoresmokeeip2200)

## Functions

###  updateSstoreSmokeEIP2200

▸ **updateSstoreSmokeEIP2200**(`runState`: RunState, `found`: any, `value`: Buffer, `key`: Buffer): *void*

*Defined in [evm/opcodes/EIP2200.ts:14](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/evm/opcodes/EIP2200.ts#L14)*

Adjusts smoke usage and refunds of SStore ops per EIP-2200 (Istanbul)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`runState` | RunState | - |
`found` | any | - |
`value` | Buffer |   |
`key` | Buffer | - |

**Returns:** *void*
