[@fourtwentyjs/block](../README.md) › ["header"](../modules/_header_.md) › [BlockHeader](_header_.blockheader.md)

# Class: BlockHeader

An object that represents the block header.

## Hierarchy

* **BlockHeader**

## Index

### Constructors

* [constructor](_header_.blockheader.md#constructor)

### Properties

* [_common](_header_.blockheader.md#_common)
* [bloom](_header_.blockheader.md#bloom)
* [coinbase](_header_.blockheader.md#coinbase)
* [difficulty](_header_.blockheader.md#difficulty)
* [extraData](_header_.blockheader.md#extradata)
* [smokeLimit](_header_.blockheader.md#smokelimit)
* [smokeUsed](_header_.blockheader.md#smokeused)
* [mixHash](_header_.blockheader.md#mixhash)
* [nonce](_header_.blockheader.md#nonce)
* [number](_header_.blockheader.md#number)
* [parentHash](_header_.blockheader.md#parenthash)
* [receiptTrie](_header_.blockheader.md#receipttrie)
* [stateRoot](_header_.blockheader.md#stateroot)
* [timestamp](_header_.blockheader.md#timestamp)
* [transactionsTrie](_header_.blockheader.md#transactionstrie)
* [uncleHash](_header_.blockheader.md#unclehash)

### Methods

* [_validateBufferLengths](_header_.blockheader.md#_validatebufferlengths)
* [canonicalDifficulty](_header_.blockheader.md#canonicaldifficulty)
* [hash](_header_.blockheader.md#hash)
* [isGenesis](_header_.blockheader.md#isgenesis)
* [raw](_header_.blockheader.md#raw)
* [serialize](_header_.blockheader.md#serialize)
* [toJSON](_header_.blockheader.md#tojson)
* [validate](_header_.blockheader.md#validate)
* [validateDifficulty](_header_.blockheader.md#validatedifficulty)
* [validateSmokeLimit](_header_.blockheader.md#validatesmokelimit)
* [fromHeaderData](_header_.blockheader.md#static-fromheaderdata)
* [fromRLPSerializedHeader](_header_.blockheader.md#static-fromrlpserializedheader)
* [fromValuesArray](_header_.blockheader.md#static-fromvaluesarray)
* [genesis](_header_.blockheader.md#static-genesis)

## Constructors

###  constructor

\+ **new BlockHeader**(`parentHash`: Buffer, `uncleHash`: Buffer, `coinbase`: Address, `stateRoot`: Buffer, `transactionsTrie`: Buffer, `receiptTrie`: Buffer, `bloom`: Buffer, `difficulty`: BN, `number`: BN, `smokeLimit`: BN, `smokeUsed`: BN, `timestamp`: BN, `extraData`: Buffer, `mixHash`: Buffer, `nonce`: Buffer, `options`: [BlockOptions](../interfaces/_index_.blockoptions.md)): *[BlockHeader](_header_.blockheader.md)*

*Defined in [header.ts:138](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L138)*

This constructor takes the values, validates them, assigns them and freezes the object.
Use the public static factory methods to assist in creating a Header object from
varying data types.
For a default empty header, use `BlockHeader.fromHeaderData()`.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`parentHash` | Buffer | - |
`uncleHash` | Buffer | - |
`coinbase` | Address | - |
`stateRoot` | Buffer | - |
`transactionsTrie` | Buffer | - |
`receiptTrie` | Buffer | - |
`bloom` | Buffer | - |
`difficulty` | BN | - |
`number` | BN | - |
`smokeLimit` | BN | - |
`smokeUsed` | BN | - |
`timestamp` | BN | - |
`extraData` | Buffer | - |
`mixHash` | Buffer | - |
`nonce` | Buffer | - |
`options` | [BlockOptions](../interfaces/_index_.blockoptions.md) | {} |

**Returns:** *[BlockHeader](_header_.blockheader.md)*

## Properties

###  _common

• **_common**: *Common*

*Defined in [header.ts:38](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L38)*

___

###  bloom

• **bloom**: *Buffer*

*Defined in [header.ts:28](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L28)*

___

###  coinbase

• **coinbase**: *Address*

*Defined in [header.ts:24](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L24)*

___

###  difficulty

• **difficulty**: *BN*

*Defined in [header.ts:29](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L29)*

___

###  extraData

• **extraData**: *Buffer*

*Defined in [header.ts:34](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L34)*

___

###  smokeLimit

• **smokeLimit**: *BN*

*Defined in [header.ts:31](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L31)*

___

###  smokeUsed

• **smokeUsed**: *BN*

*Defined in [header.ts:32](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L32)*

___

###  mixHash

• **mixHash**: *Buffer*

*Defined in [header.ts:35](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L35)*

___

###  nonce

• **nonce**: *Buffer*

*Defined in [header.ts:36](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L36)*

___

###  number

• **number**: *BN*

*Defined in [header.ts:30](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L30)*

___

###  parentHash

• **parentHash**: *Buffer*

*Defined in [header.ts:22](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L22)*

___

###  receiptTrie

• **receiptTrie**: *Buffer*

*Defined in [header.ts:27](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L27)*

___

###  stateRoot

• **stateRoot**: *Buffer*

*Defined in [header.ts:25](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L25)*

___

###  timestamp

• **timestamp**: *BN*

*Defined in [header.ts:33](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L33)*

___

###  transactionsTrie

• **transactionsTrie**: *Buffer*

*Defined in [header.ts:26](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L26)*

___

###  uncleHash

• **uncleHash**: *Buffer*

*Defined in [header.ts:23](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L23)*

## Methods

###  _validateBufferLengths

▸ **_validateBufferLengths**(): *void*

*Defined in [header.ts:232](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L232)*

Validates correct buffer lengths, throws if invalid.

**Returns:** *void*

___

###  canonicalDifficulty

▸ **canonicalDifficulty**(`parentBlockHeader`: [BlockHeader](_header_.blockheader.md)): *BN*

*Defined in [header.ts:261](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L261)*

Returns the canonical difficulty for this block.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`parentBlockHeader` | [BlockHeader](_header_.blockheader.md) | the header from the parent `Block` of this header  |

**Returns:** *BN*

___

###  hash

▸ **hash**(): *Buffer*

*Defined in [header.ts:447](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L447)*

Returns the hash of the block header.

**Returns:** *Buffer*

___

###  isGenesis

▸ **isGenesis**(): *boolean*

*Defined in [header.ts:454](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L454)*

Checks if the block header is a genesis header.

**Returns:** *boolean*

___

###  raw

▸ **raw**(): *[BlockHeaderBuffer](../modules/_index_.md#blockheaderbuffer)*

*Defined in [header.ts:424](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L424)*

Returns a Buffer Array of the raw Buffers in this header, in order.

**Returns:** *[BlockHeaderBuffer](../modules/_index_.md#blockheaderbuffer)*

___

###  serialize

▸ **serialize**(): *Buffer*

*Defined in [header.ts:461](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L461)*

Returns the rlp encoding of the block header.

**Returns:** *Buffer*

___

###  toJSON

▸ **toJSON**(): *[JsonHeader](../interfaces/_index_.jsonheader.md)*

*Defined in [header.ts:468](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L468)*

Returns the block header in JSON format.

**Returns:** *[JsonHeader](../interfaces/_index_.jsonheader.md)*

___

###  validate

▸ **validate**(`blockchain?`: [Blockchain](../interfaces/_index_.blockchain.md), `height?`: BN): *Promise‹void›*

*Defined in [header.ts:378](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L378)*

Validates the block header, throwing if invalid.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`blockchain?` | [Blockchain](../interfaces/_index_.blockchain.md) | additionally validate against a @fourtwentyjs/blockchain |
`height?` | BN | If this is an uncle header, this is the height of the block that is including it  |

**Returns:** *Promise‹void›*

___

###  validateDifficulty

▸ **validateDifficulty**(`parentBlockHeader`: [BlockHeader](_header_.blockheader.md)): *boolean*

*Defined in [header.ts:345](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L345)*

Checks that the block's `difficulty` matches the canonical difficulty.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`parentBlockHeader` | [BlockHeader](_header_.blockheader.md) | the header from the parent `Block` of this header  |

**Returns:** *boolean*

___

###  validateSmokeLimit

▸ **validateSmokeLimit**(`parentBlockHeader`: [BlockHeader](_header_.blockheader.md)): *boolean*

*Defined in [header.ts:354](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L354)*

Validates the smokeLimit.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`parentBlockHeader` | [BlockHeader](_header_.blockheader.md) | the header from the parent `Block` of this header  |

**Returns:** *boolean*

___

### `Static` fromHeaderData

▸ **fromHeaderData**(`headerData`: [HeaderData](../interfaces/_index_.headerdata.md), `opts`: [BlockOptions](../interfaces/_index_.blockoptions.md)): *[BlockHeader](_header_.blockheader.md)‹›*

*Defined in [header.ts:40](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L40)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`headerData` | [HeaderData](../interfaces/_index_.headerdata.md) | {} |
`opts` | [BlockOptions](../interfaces/_index_.blockoptions.md) | {} |

**Returns:** *[BlockHeader](_header_.blockheader.md)‹›*

___

### `Static` fromRLPSerializedHeader

▸ **fromRLPSerializedHeader**(`serialized`: Buffer, `opts`: [BlockOptions](../interfaces/_index_.blockoptions.md)): *[BlockHeader](_header_.blockheader.md)‹›*

*Defined in [header.ts:79](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | Buffer |
`opts` | [BlockOptions](../interfaces/_index_.blockoptions.md) |

**Returns:** *[BlockHeader](_header_.blockheader.md)‹›*

___

### `Static` fromValuesArray

▸ **fromValuesArray**(`values`: [BlockHeaderBuffer](../modules/_index_.md#blockheaderbuffer), `opts`: [BlockOptions](../interfaces/_index_.blockoptions.md)): *[BlockHeader](_header_.blockheader.md)‹›*

*Defined in [header.ts:89](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`values` | [BlockHeaderBuffer](../modules/_index_.md#blockheaderbuffer) |
`opts` | [BlockOptions](../interfaces/_index_.blockoptions.md) |

**Returns:** *[BlockHeader](_header_.blockheader.md)‹›*

___

### `Static` genesis

▸ **genesis**(`headerData`: [HeaderData](../interfaces/_index_.headerdata.md), `opts`: [BlockOptions](../interfaces/_index_.blockoptions.md)): *[BlockHeader](_header_.blockheader.md)‹›*

*Defined in [header.ts:135](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/src/header.ts#L135)*

Alias for Header.fromHeaderData() with initWithGenesisHeader set to true.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`headerData` | [HeaderData](../interfaces/_index_.headerdata.md) | {} |
`opts` | [BlockOptions](../interfaces/_index_.blockoptions.md) | {} |

**Returns:** *[BlockHeader](_header_.blockheader.md)‹›*
