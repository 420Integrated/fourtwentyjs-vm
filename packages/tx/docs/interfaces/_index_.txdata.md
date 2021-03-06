[@fourtwentyjs/tx](../README.md) › ["index"](../modules/_index_.md) › [TxData](_index_.txdata.md)

# Interface: TxData

An object with an optional field with each of the transaction's values.

## Hierarchy

* **TxData**

## Index

### Properties

* [data](_index_.txdata.md#optional-data)
* [smokeLimit](_index_.txdata.md#optional-smokelimit)
* [smokePrice](_index_.txdata.md#optional-smokeprice)
* [nonce](_index_.txdata.md#optional-nonce)
* [r](_index_.txdata.md#optional-r)
* [s](_index_.txdata.md#optional-s)
* [to](_index_.txdata.md#optional-to)
* [v](_index_.txdata.md#optional-v)
* [value](_index_.txdata.md#optional-value)

## Properties

### `Optional` data

• **data**? : *BufferLike*

*Defined in [types.ts:50](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/types.ts#L50)*

This will contain the data of the message or the init of a contract.

___

### `Optional` smokeLimit

• **smokeLimit**? : *BNLike*

*Defined in [types.ts:35](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/types.ts#L35)*

The transaction's smoke limit.

___

### `Optional` smokePrice

• **smokePrice**? : *BNLike*

*Defined in [types.ts:30](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/types.ts#L30)*

The transaction's smoke price.

___

### `Optional` nonce

• **nonce**? : *BNLike*

*Defined in [types.ts:25](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/types.ts#L25)*

The transaction's nonce.

___

### `Optional` r

• **r**? : *BNLike*

*Defined in [types.ts:60](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/types.ts#L60)*

EC signature parameter.

___

### `Optional` s

• **s**? : *BNLike*

*Defined in [types.ts:65](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/types.ts#L65)*

EC signature parameter.

___

### `Optional` to

• **to**? : *AddressLike*

*Defined in [types.ts:40](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/types.ts#L40)*

The transaction's the address is sent to.

___

### `Optional` v

• **v**? : *BNLike*

*Defined in [types.ts:55](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/types.ts#L55)*

EC recovery ID.

___

### `Optional` value

• **value**? : *BNLike*

*Defined in [types.ts:45](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/tx/src/types.ts#L45)*

The amount of Ether sent.
