[@fourtwentyjs/block](../README.md) › ["from-rpc"](_from_rpc_.md)

# Module: "from-rpc"

## Index

### Functions

* [blockFromRpc](_from_rpc_.md#blockfromrpc)

## Functions

###  blockFromRpc

▸ **blockFromRpc**(`blockParams`: any, `uncles`: any[], `options?`: [BlockOptions](../interfaces/_index_.blockoptions.md)): *[Block](../classes/_block_.block.md)‹›*

*Defined in [from-rpc.ts:32](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/from-rpc.ts#L32)*

Creates a new block object from 420coin JSON RPC.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`blockParams` | any | - | 420coin JSON RPC of block (fourtwenty_getBlockByNumber) |
`uncles` | any[] | [] | Optional list of 420coin JSON RPC of uncles (fourtwenty_getUncleByBlockHashAndIndex) |
`options?` | [BlockOptions](../interfaces/_index_.blockoptions.md) | - | - |

**Returns:** *[Block](../classes/_block_.block.md)‹›*
