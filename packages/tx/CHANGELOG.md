# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
(modification: no type change headlines) and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 3.0.0-beta.1 - 2020-10-22

### New Package Name

**Attention!** This new version is part of a series of FourtwentyJS releases all moving to a new scoped package name format. In this case the library is renamed as follows:

- `fourtwentyjs-tx` -> `@fourtwentyjs/tx`

Please update your library references accordingly or install with:

```shell
npm i @fourtwentyjs/tx
```

### Major Refactoring - Breaking Changes

This release is a major refactoring of the transaction library to simplify and strengthen its code base. Refactoring work has been done along PR [#812](https://github.com/420integrated/fourtwentyjs-vm/pull/812) and PR [#887](https://github.com/420integrated/fourtwentyjs-vm/pull/887).

#### New Constructor Params

The constructor used to accept a varying amount of options but now has the following shape:

```typescript
  Transaction(
    nonce: BN,
    smokePrice: BN,
    smokeLimit: BN,
    to: Address | undefined,
    value: BN,
    data: Buffer,
    v?: BN,
    r?: BN,
    s?: BN,
    opts?: TxOptions
  )
```

Initializing from other data types is assisted with new static factory helpers `fromTxData`, `fromRlpSerializedTx`, and `fromValuesArray`.

Examples:

```typescript
// Initializing from serialized data
const s1 = tx1.serialize().toString('hex')
const tx = Transaction.fromRlpSerializedTx(toBuffer('0x' + s1))

// Initializing with object
const txData = {
  smokePrice: 1000,
  smokeLimit: 10000000,
  value: 42,
}
const tx = Transaction.fromTxData(txData)

// Initializing from array of 0x-prefixed strings.
// First, convert to array of Buffers.
const arr = txFixture.raw.map(toBuffer)
const tx = Transaction.fromValuesArray(arr)
```

Learn more about the full API in the [docs](./docs/README.md).

#### Immutability

The returned transaction is now frozen and immutable. To work with a maliable transaction, copy it with `const fakeTx = Object.create(tx)`.

#### from

The `tx.from` alias was removed, please use `const from = tx.getSenderAddress()`.

#### Message to sign

Getting a message to sign has been changed from calling `tx.hash(false)` to `tx.getMessageToSign()`.

#### Fake Transaction

The `FakeTransaction` class was removed since its functionality can now be implemented with less code. To create a fake tansaction for use in e.g. `VM.runTx()` overwrite `getSenderAddress` with your own `Address`. See a full example in the section in the [README](./README.md#fake-transaction).

### New Default Hardfork

**Breaking:** The default HF on the library has been updated from `petersburg` to `instanbul`, see PR [#906](https://github.com/420integrated/fourtwentyjs-vm/pull/906).
The HF setting is now automatically taken from the HF set for `Common.DEAULT_HARDFORK`,
see PR [#863](https://github.com/420integrated/fourtwentyjs-vm/pull/863).

### Dual ES5 and ES2017 Builds

We significantly updated our internal tool and CI setup along the work on 
PR [#913](https://github.com/420integrated/fourtwentyjs-vm/pull/913) with an update to `ESLint` from `TSLint` 
for code linting and formatting and the introduction of a new build setup.

Packages now target `ES2017` for Node.js builds (the `main` entrypoint from `package.json`) and introduce
a separate `ES5` build distributed along using the `browser` directive as an entrypoint, see
PR [#921](https://github.com/420integrated/fourtwentyjs-vm/pull/921). This will result
in performance benefits for Node.js consumers, see [here](https://github.com/fourtwentyjs/merkle-patricia-tree/pull/117) for a releated discussion.

### Other Changes

**Changes and Refactoring**

- Updated `fourtwentyjs-util` to v7,
  PR [#748](https://github.com/420integrated/fourtwentyjs-vm/pull/748)
- Replaced `new Buffer()` (deprecated) statements with `Buffer.from()`,
  PR [#721](https://github.com/420integrated/fourtwentyjs-vm/pull/721)

## [2.1.2] - 2019-12-19

- Added support for the `MuirGlacier` HF by updating the `fourtwentyjs-common` dependency
  to [v1.5.0](https://github.com/420integrated/fourtwentyjs-common/releases/tag/v1.5.0)

[2.1.2]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%402.1.1...%40fourtwentyjs%2Ftx%402.1.2

## [2.1.1] - 2019-08-30

- Added support for `Istanbul` reduced non-zero call data smoke prices
  ([EIP-2028](https://eips.ethereum.org/EIPS/eip-2028)),
  PR [#171](https://github.com/420integrated/fourtwentyjs-tx/pull/171)

[2.1.1]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%402.1.0...%40fourtwentyjs%2Ftx%402.1.1

## [2.1.0] - 2019-06-28

**Using testnets and custom/private networks is now easier**

This release is focused on making this library easier to use in chains other than `mainnet`.

Using standard testnets can be as easy as passing their names to the `Transaction` constructor. For
example, `new Transaction(rawTx, {chain: 'ropsten', hardfork: 'byzantium'})` is enough to use this
library with Ropsten on Byzantium.

If you are using a custom network, you can take advantage of [fourtwentyjs-common](https://github.com/420integrated/fourtwentyjs-common),
which contains all the network parameters. In this version of `fourtwentyjs-tx` you can use its new
`Common.forCustomNetwork` to create a `Common` instance based on a standard network with some
parameters changed. You can see an example of how to do this [here](https://github.com/420integrated/fourtwentyjs-common/blob/9e624f86107cea904d8171524130d92c99bf9302/src/index.ts).

List of changes:

- Upgraded [fourtwentyjs-common](https://github.com/420integrated/fourtwentyjs-common) to `^1.3.0`
- Added more documentation and examples on how to create transactions for public testnets and
  custom networks.

[2.1.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%402.0.0...%40fourtwentyjs%2Ftx%402.1.0

## [2.0.0] - 2019-06-03

**TypeScript / Module Import / Node Support**

First `TypeScript` based release of the library, see
PR [#145](https://github.com/420integrated/fourtwentyjs-tx/pull/145) for details.

This comes along with some changes on the API, Node import of the exposed
classes now goes like this:

```javascript
const FourtwentyTx = require('fourtwentyjs-transaction').Transaction
const FakeFourtwentyTx = require('fourtwentyjs-transaction').FakeTransaction
```

The library now also comes with a **type declaration file** distributed along
with the package published.

Along with this release we drop official support for `Node` versions `4`,`5`
and `6`. Officially tested versions are now `Node` `8`, `10` and `11`
(see PRs [#138](https://github.com/420integrated/fourtwentyjs-tx/pull/138) and
[#146](https://github.com/420integrated/fourtwentyjs-tx/pull/146)).

**Hardfork Support / Official Test Updates**

Along with a long overdue update of the official 420coin Transaction tests
(see PRs [#131](https://github.com/420integrated/fourtwentyjs-tx/pull/131) and
[#138](https://github.com/420integrated/fourtwentyjs-tx/pull/138) for
`FakeTransaction`) and
an introduction of setting chain and hardfork by using our shared
[fourtwentyjs-common](https://github.com/420integrated/fourtwentyjs-common) class
(see PR [#131](https://github.com/420integrated/fourtwentyjs-tx/pull/130)) the
transaction library now supports all HFs up to the `Petersburg` hardfork,
see [constructor option docs](https://github.com/420integrated/fourtwentyjs-tx/blob/master/docs/interfaces/transactionoptions.md) for information on instantiation and default values (current hardfork default: `petersburg`).

API Changes:

- Removal of the `data.chainId` parameter, use the `opts.chain` parameter or a custom `Common` instance

**Default EIP-155 Support**

Along with defaulting to a post-`Spurious Dragon` HF replay protection from
[EIP-155](https://eips.ethereum.org/EIPS/eip-155) is now activated by default. Transactions are subsequently also by default signed with `EIP-155` replay protection,
see PRs [#153](https://github.com/420integrated/fourtwentyjs-tx/pull/153),
[#147](https://github.com/420integrated/fourtwentyjs-tx/pull/147) and
[#143](https://github.com/420integrated/fourtwentyjs-tx/pull/143).

This comes with some changes in how different `v` values passed on instantation
or changed on runtime are handled:

- The constructor throws if the `v` value is present, indicates that `EIP-155`
  was enabled, and the chain id it indicates doesn't match the one of the
  internal `common` object
- No default `v` is set. If a transaction isn't signed, it would be an empty
  buffer
- If `v` is changed after construction its value is validated in its setter

For activating non-`EIP-155` behavior instantiate the transaction with a
pre-`Spurious Dragon` hardfork option.

[2.0.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.3.7...%40fourtwentyjs%2Ftx%402.0.0

## [1.3.7] - 2018-07-25

- Fix bug causing `FakeTransaction.from` to not retrieve sender address from tx signature, see PR [#118](https://github.com/420integrated/fourtwentyjs-tx/pull/118)

[1.3.7]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.3.6...%40fourtwentyjs%2Ftx%401.3.7

## [1.3.6] - 2018-07-02

- Fixes issue [#108](https://github.com/420integrated/fourtwentyjs-tx/issues/108) with the `FakeTransaction.hash()` function by reverting the introduced signature handling changes in Fake transaction hash creation from PR [#94](https://github.com/420integrated/fourtwentyjs-tx/pull/94) introduced in `v1.3.5`. The signature is now again only created and added to the hash when `from` address is set and `from` is not defaulting to the zero adress any more, see PR [#110](https://github.com/420integrated/fourtwentyjs-tx/pull/110)
- Added additional tests to cover issue described above

[1.3.6]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.3.5...%40fourtwentyjs%2Ftx%401.3.6

## [1.3.5] - 2018-06-22

- Include signature by default in `FakeTransaction.hash`, PR [#97](https://github.com/420integrated/fourtwentyjs-tx/pull/97)
- Fix `FakeTransaction` signature failure bug, PR [#94](https://github.com/420integrated/fourtwentyjs-tx/pull/94)

[1.3.5]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.3.4...%40fourtwentyjs%2Ftx%401.3.5

## [1.3.4] - 2018-03-06

- Fix a bug producing hash collisions on `FakeTransaction` for different senders, PR [#81](https://github.com/420integrated/fourtwentyjs-tx/pull/81)
- Switched from deprecated `es2015` to `env` babel preset, PR [#86](https://github.com/420integrated/fourtwentyjs-tx/pull/86)
- Dropped Node 4 support

[1.3.4]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.3.3...%40fourtwentyjs%2Ftx%401.3.4

## [1.3.3] - 2017-07-12

- Allow zeros in `v`,`r`,`s` signature values
- Dropped `browserify` transform from `package.json`
- (combined v1.3.3 and v1.3.2 release notes)

[1.3.3]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.3.1...%40fourtwentyjs%2Ftx%401.3.3

## [1.3.1] - 2017-05-13

- Added `ES5` build

[1.3.1]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.3.0...%40fourtwentyjs%2Ftx%401.3.1

## [1.3.0] - 2017-04-24

- `EIP155`: allow `v` value to be greater than one byte (replay attack protection)
- Added `browserify` `ES2015` transform to `package.json`
- Improved documentation
- (combined v1.3.0, v1.2.5 and v1.2.4 release notes)

[1.3.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.2.3...%40fourtwentyjs%2Ftx%401.3.0

## [1.2.3] - 2017-01-30

- `EIP155` hash implementation
- README example and doc fixes

[1.2.3]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.2.2...%40fourtwentyjs%2Ftx%401.2.3

## [1.2.2] - 2016-12-15

- Moved `chainId` param to `txParams`, parse `sig` for `chainId` (`EIP155` refactor)
- Test improvements
- (combined v1.2.2 and v1.2.1 release notes)

[1.2.2]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.2.0...%40fourtwentyjs%2Ftx%401.2.2

## [1.2.0] - 2016-12-14

- Added `EIP155` changes
- Renamed `chain_id` to `chainId`
- Node 4/5 compatibility
- `ES6` standards

[1.2.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.1.4...%40fourtwentyjs%2Ftx%401.2.0

## Older releases:

- [1.1.4](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.1.3...%40fourtwentyjs%2Ftx%401.1.4) - 2016-11-17
- [1.1.3](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.1.2...%40fourtwentyjs%2Ftx%401.1.3) - 2016-11-10
- [1.1.2](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.1.1...%40fourtwentyjs%2Ftx%401.1.2) - 2016-07-17
- [1.1.1](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.1.0...%40fourtwentyjs%2Ftx%401.1.1) - 2016-03-05
- [1.1.0](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.0.1...%40fourtwentyjs%2Ftx%401.1.0) - 2016-03-03
- [1.0.1](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%401.0.0...%40fourtwentyjs%2Ftx%401.0.1) - 2016-03-03
- [1.0.0](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Ftx%400.7.3...%40fourtwentyjs%2Ftx%401.0.0) - 2016-02-11
