[@fourtwentyjs/tx](../README.md) › ["index"](../modules/_index_.md) › [Transaction](_index_.transaction.md)

# Class: Transaction

An 420coin transaction.

## Hierarchy

* **Transaction**

## Index

### Constructors

* [constructor](_index_.transaction.md#constructor)

### Properties

* [common](_index_.transaction.md#common)
* [data](_index_.transaction.md#data)
* [smokeLimit](_index_.transaction.md#smokelimit)
* [smokePrice](_index_.transaction.md#smokeprice)
* [nonce](_index_.transaction.md#nonce)
* [r](_index_.transaction.md#optional-r)
* [s](_index_.transaction.md#optional-s)
* [to](_index_.transaction.md#optional-to)
* [v](_index_.transaction.md#optional-v)
* [value](_index_.transaction.md#value)

### Methods

* [getBaseFee](_index_.transaction.md#getbasefee)
* [getChainId](_index_.transaction.md#getchainid)
* [getDataFee](_index_.transaction.md#getdatafee)
* [getMessageToSign](_index_.transaction.md#getmessagetosign)
* [getMessageToVerifySignature](_index_.transaction.md#getmessagetoverifysignature)
* [getSenderAddress](_index_.transaction.md#getsenderaddress)
* [getSenderPublicKey](_index_.transaction.md#getsenderpublickey)
* [getUpfrontCost](_index_.transaction.md#getupfrontcost)
* [hash](_index_.transaction.md#hash)
* [isSigned](_index_.transaction.md#issigned)
* [raw](_index_.transaction.md#raw)
* [serialize](_index_.transaction.md#serialize)
* [sign](_index_.transaction.md#sign)
* [toCreationAddress](_index_.transaction.md#tocreationaddress)
* [toJSON](_index_.transaction.md#tojson)
* [validate](_index_.transaction.md#validate)
* [verifySignature](_index_.transaction.md#verifysignature)
* [fromRlpSerializedTx](_index_.transaction.md#static-fromrlpserializedtx)
* [fromTxData](_index_.transaction.md#static-fromtxdata)
* [fromValuesArray](_index_.transaction.md#static-fromvaluesarray)

## Constructors

###  constructor

\+ **new Transaction**(`nonce`: BN, `smokePrice`: BN, `smokeLimit`: BN, `to`: Address | undefined, `value`: BN, `data`: Buffer, `v?`: BN, `r?`: BN, `s?`: BN, `opts?`: [TxOptions](../interfaces/_index_.txoptions.md)): *[Transaction](_index_.transaction.md)*

*Defined in [transaction.ts:87](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L87)*

This constructor takes the values, validates them, assigns them and freezes the object.
Use the static factory methods to assist in creating a Transaction object from varying data types.

**`note`** Transaction objects implement EIP155 by default. To disable it, pass in an `@fourtwentyjs/common` object set before EIP155 activation (i.e. before Spurious Dragon).

**Parameters:**

Name | Type |
------ | ------ |
`nonce` | BN |
`smokePrice` | BN |
`smokeLimit` | BN |
`to` | Address &#124; undefined |
`value` | BN |
`data` | Buffer |
`v?` | BN |
`r?` | BN |
`s?` | BN |
`opts?` | [TxOptions](../interfaces/_index_.txoptions.md) |

**Returns:** *[Transaction](_index_.transaction.md)*

## Properties

###  common

• **common**: *Common*

*Defined in [transaction.ts:28](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L28)*

___

###  data

• **data**: *Buffer*

*Defined in [transaction.ts:34](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L34)*

___

###  smokeLimit

• **smokeLimit**: *BN*

*Defined in [transaction.ts:30](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L30)*

___

###  smokePrice

• **smokePrice**: *BN*

*Defined in [transaction.ts:31](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L31)*

___

###  nonce

• **nonce**: *BN*

*Defined in [transaction.ts:29](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L29)*

___

### `Optional` r

• **r**? : *BN*

*Defined in [transaction.ts:36](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L36)*

___

### `Optional` s

• **s**? : *BN*

*Defined in [transaction.ts:37](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L37)*

___

### `Optional` to

• **to**? : *Address*

*Defined in [transaction.ts:32](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L32)*

___

### `Optional` v

• **v**? : *BN*

*Defined in [transaction.ts:35](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L35)*

___

###  value

• **value**: *BN*

*Defined in [transaction.ts:33](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L33)*

## Methods

###  getBaseFee

▸ **getBaseFee**(): *BN*

*Defined in [transaction.ts:292](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L292)*

The minimum amount of smoke the tx must have (DataFee + TxFee + Creation Fee)

**Returns:** *BN*

___

###  getChainId

▸ **getChainId**(): *number*

*Defined in [transaction.ts:179](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L179)*

Returns chain ID

**Returns:** *number*

___

###  getDataFee

▸ **getDataFee**(): *BN*

*Defined in [transaction.ts:278](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L278)*

The amount of smoke paid for the data in this tx

**Returns:** *BN*

___

###  getMessageToSign

▸ **getMessageToSign**(): *Buffer‹›*

*Defined in [transaction.ts:168](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L168)*

**Returns:** *Buffer‹›*

___

###  getMessageToVerifySignature

▸ **getMessageToVerifySignature**(): *Buffer‹›*

*Defined in [transaction.ts:172](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L172)*

**Returns:** *Buffer‹›*

___

###  getSenderAddress

▸ **getSenderAddress**(): *Address*

*Defined in [transaction.ts:186](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L186)*

Returns the sender's address

**Returns:** *Address*

___

###  getSenderPublicKey

▸ **getSenderPublicKey**(): *Buffer*

*Defined in [transaction.ts:193](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L193)*

Returns the public key of the sender

**Returns:** *Buffer*

___

###  getUpfrontCost

▸ **getUpfrontCost**(): *BN*

*Defined in [transaction.ts:303](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L303)*

The up front amount that an account must have for this transaction to be valid

**Returns:** *BN*

___

###  hash

▸ **hash**(): *Buffer*

*Defined in [transaction.ts:152](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L152)*

Computes a sha3-256 hash of the serialized tx

**Returns:** *Buffer*

___

###  isSigned

▸ **isSigned**(): *boolean*

*Defined in [transaction.ts:368](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L368)*

**Returns:** *boolean*

___

###  raw

▸ **raw**(): *Buffer[]*

*Defined in [transaction.ts:330](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L330)*

Returns a Buffer Array of the raw Buffers of this transaction, in order.

**Returns:** *Buffer[]*

___

###  serialize

▸ **serialize**(): *Buffer*

*Defined in [transaction.ts:347](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L347)*

Returns the rlp encoding of the transaction.

**Returns:** *Buffer*

___

###  sign

▸ **sign**(`privateKey`: Buffer): *[Transaction](_index_.transaction.md)‹›*

*Defined in [transaction.ts:242](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L242)*

Sign a transaction with a given private key.
Returns a new Transaction object (the original tx will not be modified).
Example:
```typescript
const unsignedTx = Transaction.fromTxData(txData)
const signedTx = unsignedTx.sign(privKey)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`privateKey` | Buffer | Must be 32 bytes in length.  |

**Returns:** *[Transaction](_index_.transaction.md)‹›*

___

###  toCreationAddress

▸ **toCreationAddress**(): *boolean*

*Defined in [transaction.ts:145](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L145)*

If the tx's `to` is to the creation address

**Returns:** *boolean*

___

###  toJSON

▸ **toJSON**(): *[JsonTx](../interfaces/_index_.jsontx.md)*

*Defined in [transaction.ts:354](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L354)*

Returns an object with the JSON representation of the transaction

**Returns:** *[JsonTx](../interfaces/_index_.jsontx.md)*

___

###  validate

▸ **validate**(): *boolean*

*Defined in [transaction.ts:310](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L310)*

Validates the signature and checks to see if it has enough smoke.

**Returns:** *boolean*

▸ **validate**(`stringError`: false): *boolean*

*Defined in [transaction.ts:311](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L311)*

**Parameters:**

Name | Type |
------ | ------ |
`stringError` | false |

**Returns:** *boolean*

▸ **validate**(`stringError`: true): *string[]*

*Defined in [transaction.ts:312](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L312)*

**Parameters:**

Name | Type |
------ | ------ |
`stringError` | true |

**Returns:** *string[]*

___

###  verifySignature

▸ **verifySignature**(): *boolean*

*Defined in [transaction.ts:224](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L224)*

Determines if the signature is valid

**Returns:** *boolean*

___

### `Static` fromRlpSerializedTx

▸ **fromRlpSerializedTx**(`serialized`: Buffer, `opts?`: [TxOptions](../interfaces/_index_.txoptions.md)): *[Transaction](_index_.transaction.md)‹›*

*Defined in [transaction.ts:56](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`serialized` | Buffer |
`opts?` | [TxOptions](../interfaces/_index_.txoptions.md) |

**Returns:** *[Transaction](_index_.transaction.md)‹›*

___

### `Static` fromTxData

▸ **fromTxData**(`txData`: [TxData](../interfaces/_index_.txdata.md), `opts?`: [TxOptions](../interfaces/_index_.txoptions.md)): *[Transaction](_index_.transaction.md)‹›*

*Defined in [transaction.ts:39](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`txData` | [TxData](../interfaces/_index_.txdata.md) |
`opts?` | [TxOptions](../interfaces/_index_.txoptions.md) |

**Returns:** *[Transaction](_index_.transaction.md)‹›*

___

### `Static` fromValuesArray

▸ **fromValuesArray**(`values`: Buffer[], `opts?`: [TxOptions](../interfaces/_index_.txoptions.md)): *[Transaction](_index_.transaction.md)‹›*

*Defined in [transaction.ts:66](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/transaction.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`values` | Buffer[] |
`opts?` | [TxOptions](../interfaces/_index_.txoptions.md) |

**Returns:** *[Transaction](_index_.transaction.md)‹›*
