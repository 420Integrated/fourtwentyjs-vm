# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
(modification: no type change headlines) and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 5.0.0-beta.1 - 2020-10-22

### New Package Name

**Attention!** This new version is part of a series of FourtwentyJS releases all moving to a new scoped package name format. In this case the library is renamed as follows:

- `fourtwentyjs-blockchain` -> `@fourtwentyjs/blockchain`

Please update your library references accordingly or install with:

```shell
npm i @fourtwentyjs/blockchain
```

### Library Promisification

The `Blockchain` library has been promisified and callbacks have been removed along
PR [#833](https://github.com/420integrated/fourtwentyjs-vm/pull/833) and preceeding PR
[#779](https://github.com/420integrated/fourtwentyjs-vm/pull/779).

Old API example:

```typescript
blockchain.getBlock(blockId, (block) => {
  console.log(block)
})
```

New API example:

```typescript
const block = await blockchain.getBlock(blockId)
console.log(block)
```

See `Blockchain` [README](https://github.com/420integrated/fourtwentyjs-vm/tree/master/packages/blockchain#example) for a complete example.

### Constructor API Changes

Constructor options for chain setup on all VM monorepo libraries have been simplified and the plain `chain` and `hardfork` options have been removed. Passing in a `Common` instance is now the single way to switch to a non-default chain (`mainnet`) or start a blockchain with a higher than `chainstart` hardfork, see PR [#863](https://github.com/420integrated/fourtwentyjs-vm/pull/863).

Example:

```typescript
import Blockchain from '@fourtwentyjs/blockchain'
const common = new Common({ chain: 'ropsten', hardfork: 'byzantium' })
const blockchain = new Blockchain({ common })
```

### Removed deprecated `validate` option

The deprecated `validate` option has been removed, please use `valdiateBlock` and `validatePow` for options when instantiating a new `Blockchain`.

[5.0.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%404.0.2...%40fourtwentyjs%2Fblockchain%405.0.0

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

- Use `@fourtwentyjs/block` `v3.0.0` block library version,
  PR [#883](https://github.com/420integrated/fourtwentyjs-vm/pull/883)
- Removed `async` dependency,
  PR [#779](https://github.com/420integrated/fourtwentyjs-vm/pull/779)
- Updated `fourtwentyjs-util` to v7,
  PR [#748](https://github.com/420integrated/fourtwentyjs-vm/pull/748)

**Bug Fixes**

- Fixed blockchain hanging forever in case code throws between a semaphore `lock`/`unlock`,
  Issue [#877](https://github.com/420integrated/fourtwentyjs-vm/issues/877)

## 4.0.4 - 2020-07-27

This release replaces the tilde (`~`) dependency from `fourtwentyjs-util` for a caret (`^`) one, meaning that any update to `fourtwentyjs-util` v6 will also be available for this library.

## [4.0.3] - 2019-12-19

Supports `MuirGlacier` by updating `fourtwentyjs-block` to
[v2.2.2](https://github.com/420integrated/fourtwentyjs-block/releases/tag/v2.2.2)
and `fourtwentyjs-common` to
[v1.5.0](https://github.com/420integrated/fourtwentyjs-common/releases/tag/v1.5.0).

This release comes also with a completely refactored test suite, see
PR [#134](https://github.com/420integrated/fourtwentyjs-blockchain/pull/134).
Tests are now less coupled and it gets easier to modify tests or extend
the test suite.

[4.0.3]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%404.0.2...%40fourtwentyjs%2Fblockchain%404.0.3

## [4.0.2] - 2019-11-15

Supports Istanbul by updating `fourtwentyjs-block` to
[v2.2.1](https://github.com/420integrated/fourtwentyjs-block/releases/tag/v2.2.1) which in turn
uses `fourtwentyjs-tx` [v2.1.1](https://github.com/420integrated/fourtwentyjs-tx/releases/tag/v2.1.1)
which implements EIP-2028 (calldata fee reduction),
PR [#130](https://github.com/420integrated/fourtwentyjs-blockchain/pull/130).

From this release the `validate` flag is deprecated and users are encouraged
to use the more granular flags `validatePow` and `validateBlocks`. For more
on this please see [#121](https://github.com/420integrated/fourtwentyjs-blockchain/pull/121).

For Typescript users this release also comes with a `BlockchainInterface` interface
which the `Blockchain` class implements,
PR [#124](https://github.com/420integrated/fourtwentyjs-blockchain/pull/124).

[4.0.2]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%404.0.1...%40fourtwentyjs%2Fblockchain%404.0.2

## [4.0.1] - 2019-07-01

- Fixes a browser-compatibility issue caused by the library using `util.callbackify`,
  PR [#117](https://github.com/420integrated/fourtwentyjs-blockchain/pull/117)

[4.0.1]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%404.0.0...%40fourtwentyjs%2Fblockchain%404.0.1

## [4.0.0] - 2019-04-26

First **TypeScript** based release of the library. `TypeScript` handles `ES6` transpilation
[a bit differently](https://github.com/Microsoft/TypeScript/issues/2719) (at the
end: cleaner) than `babel` so `require` syntax of the library slightly changes to:

```javascript
let Blockchain = require('fourtwentyjs-blockchain').default
```

The library now also comes with a **type declaration file** distributed along
with the package published.

This release drops support for Node versions `4` and `6` due to
internal code updates requiring newer Node.js versions and removes the previously
deprecated DB constructor options `opts.blockDb` and `opts.detailsDb`.

**Change Summary:**

- Migration of code base and internal toolchain to `TypeScript`,
  PR [#92](https://github.com/420integrated/fourtwentyjs-blockchain/pull/92)
- Refactoring of `DB` operations introducing a separate `DBManager` class
  (comes along with dropped Node `6` support),
  PR [#91](https://github.com/420integrated/fourtwentyjs-blockchain/pull/91)
- Auto-generated `TSDoc` documentation,
  PR [#98](https://github.com/420integrated/fourtwentyjs-blockchain/pull/98)
- Replaced `safe-buffer` with native Node.js `Buffer` usage (this comes along
  with dropped support for Node `4`),
  PR [#92](https://github.com/420integrated/fourtwentyjs-blockchain/pull/92)
- Dropped deprecated `DB` options,
  PR [#100](https://github.com/420integrated/fourtwentyjs-blockchain/pull/100)

[4.0.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%403.4.0...%40fourtwentyjs%2Fblockchain%404.0.0

## [3.4.0] - 2019-02-06

**Petersburg** (aka `constantinopleFix`) as well as **Goerli**
support/readiness by updating to a supporting `fourtwentyjs-common` version
[v1.1.0](https://github.com/420integrated/fourtwentyjs-common/releases/tag/v1.1.0),
PR [#86](https://github.com/420integrated/fourtwentyjs-blockchain/pull/86)

[3.4.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%403.3.3...%40fourtwentyjs%2Fblockchain%403.4.0

## [3.3.3] - 2019-01-03

- Fixed a bug causing the `iterate()` method to fail when an older version
  `levelup` DB instance is passed, see PR [#83](https://github.com/420integrated/fourtwentyjs-blockchain/pull/83)

[3.3.3]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%403.3.2...%40fourtwentyjs%2Fblockchain%403.3.3

## [3.3.2] - 2018-12-20

- Updated `levelup` dependency to `level-mem` `v3.0.1`, PR [#75](https://github.com/420integrated/fourtwentyjs-blockchain/pull/75)
- Fix `putBlock()` edge case, PR [#79](https://github.com/420integrated/fourtwentyjs-blockchain/pull/79)
- Replaced uses of deprecated `new Buffer` with `Buffer.from`, PR [#80](https://github.com/420integrated/fourtwentyjs-blockchain/pull/80)

[3.3.2]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%403.3.1...%40fourtwentyjs%2Fblockchain%403.3.2

## [3.3.1] - 2018-10-26

- Replaced calls to BN.toBuffer() with BN.toArrayLike() so that `fourtwentyjs-blockchain` can run in a browser environment, PR [#73](https://github.com/420integrated/fourtwentyjs-blockchain/pull/73)

[3.3.1]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%403.3.0...%40fourtwentyjs%2Fblockchain%403.3.1

## [3.3.0] - 2018-10-19

- Constantinople support when using block validation (set with `opts.validate` in constructor),
  update to a Constantinople-ready version of the `fourtwentyjs-block` dependency (>2.1.0), PR [#71](https://github.com/420integrated/fourtwentyjs-blockchain/pull/71)

[3.3.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%403.2.1...%40fourtwentyjs%2Fblockchain%403.3.0

## [3.2.1] - 2018-08-29

- Fixed an issue with the `iterator()` function returning an error on end of block iteration instead of finish gracefully, PR [#64](https://github.com/420integrated/fourtwentyjs-blockchain/pull/64)
- Updated `fourtwentyjs-common` dependency to `v0.5.0` (custom chain support), PR [#63](https://github.com/420integrated/fourtwentyjs-blockchain/pull/63)

[3.2.1]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%403.2.0...%40fourtwentyjs%2Fblockchain%403.2.1

## [3.2.0] - 2018-08-13

- Added support for setting network and performing hardfork-specific validation by integrating with [fourtwentyjs-common](https://github.com/420integrated/fourtwentyjs-common), PR [#59](https://github.com/420integrated/fourtwentyjs-blockchain/pull/59)
- Added `Blockchain.putHeader()` and `Blockchain.putHeaders()` functions to provide header-chain functionality (needed by fourtwentyjs-client), PR [#59](https://github.com/420integrated/fourtwentyjs-blockchain/pull/59)
- Fixed a bug with caching, PR [#59](https://github.com/420integrated/fourtwentyjs-blockchain/pull/59)
- Fixed error propagation in `Blockchain.iterator()`, PR [#60](https://github.com/420integrated/fourtwentyjs-blockchain/pull/60)

[3.2.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%403.1.0...%40fourtwentyjs%2Fblockchain%403.2.0

## [3.1.0] - 2018-05-24

- New `getLatestHeader()` and `getLatestBlock()` methods for retrieving the latest header
  respectively full block in the canonical chain, PR [#52](https://github.com/420integrated/fourtwentyjs-blockchain/pull/52)
- Fixed `saveHeads()` bug not storing the internal `headHeader`/`headBlock` header cursors
  to the DB, PR [#52](https://github.com/420integrated/fourtwentyjs-blockchain/pull/52)
- Updated API docs

[3.1.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%403.0.0...%40fourtwentyjs%2Fblockchain%403.1.0

## [3.0.0] - 2018-05-18

This release comes with heavy internal changes bringing G420 DB compatibility to the
`fourtwentyjs-blockchain` library. For a full list of changes and associated discussion
see PR [#47](https://github.com/420integrated/fourtwentyjs-blockchain/pull/47)
(thanks to @vpulim for this amazing work!). To test iterating through your local G420
chaindata DB you can run the [example](https://github.com/420integrated/fourtwentyjs-blockchain#example)
in the README file.

This allows for various new use cases of the library in the areas of testing, simulation or
running actual blockchain data from a G420 node through the VM. The G420 data model used is
not compatible with the old format where chaindata and metadata have been stored separately on two leveldb
instances, so it is not possible to load an old DB with the new library version (if this causes
problems for you get in touch on GitHub or Gitter!).

Summary of the changes:

- New unified constructor where `detailsDB` and `blockDB` are replaced by a single `db` reference
- Deprecation of the `getDetails()` method now returning an empty object
- `td` and `height` are not stored in the db as meta info but computed as needed
- Block headers and body are stored under two separate keys
- Changes have been made to properly rebuild the chain and number/hash mappings as a result of forks and deletions
- A write-through cache has been added to reduce database reads
- Similar to g420, we now defend against selfish mining vulnerability
- Added many more tests to increase coverage to over 90%
- Updated docs to reflect the API changes
- Updated library dependencies

[3.0.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%402.1.0...%40fourtwentyjs%2Fblockchain%403.0.0

## [2.1.0] - 2017-10-11

- `Metro-Byzantium` compatible
- Updated `fourtwentyjs-block` dependency (new difficulty formula / difficulty bomb delay)

[2.1.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%402.0.2...%40fourtwentyjs%2Fblockchain%402.1.0

## [2.0.2] - 2017-09-19

- Tightened dependencies to prevent the `2.0.x` version of the library to break
  after `fourtwentyjs` Byzantium library updates

[2.0.2]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%402.0.1...%40fourtwentyjs%2Fblockchain%402.0.2

## [2.0.1] - 2017-09-14

- Fixed severe bug adding blocks before blockchain init is complete

[2.0.1]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%402.0.0...%40fourtwentyjs%2Fblockchain%402.0.1

## [2.0.0] - 2017-01-01

- Split `db` into `blockDB` and `detailsDB` (breaking)

[2.0.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%401.4.2...%40fourtwentyjs%2Fblockchain%402.0.0

## [1.4.2] - 2016-12-29

- New `getBlocks` API method
- Testing improvements

[1.4.2]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%401.4.1...%40fourtwentyjs%2Fblockchain%401.4.2

## [1.4.1] - 2016-03-01

- Update dependencies to support Windows

[1.4.1]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%401.4.0...%40fourtwentyjs%2Fblockchain%401.4.1

## [1.4.0] - 2016-01-09

- Bump dependencies

[1.4.0]: https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%401.3.4...%40fourtwentyjs%2Fblockchain%401.4.0

## Older releases:

- [1.3.4](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%401.3.3...%40fourtwentyjs%2Fblockchain%401.3.4) - 2016-01-08
- [1.3.3](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%401.3.2...%40fourtwentyjs%2Fblockchain%401.3.3) - 2015-11-27
- [1.3.2](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%401.3.1...%40fourtwentyjs%2Fblockchain%401.3.2) - 2015-11-27
- [1.3.1](https://github.com/420integrated/fourtwentyjs-vm/compare/%40fourtwentyjs%2Fblockchain%401.2.0...%40fourtwentyjs%2Fblockchain%401.3.1) - 2015-10-23
- 1.2.0 - 2015-10-01
