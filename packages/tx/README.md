# @fourtwentyjs/tx

[![NPM Package][tx-npm-badge]][tx-npm-link]
[![GitHub Issues][tx-issues-badge]][tx-issues-link]
[![Actions Status][tx-actions-badge]][tx-actions-link]
[![Code Coverage][tx-coverage-badge]][tx-coverage-link]
[![Discord][discord-badge]][discord-link]

# INSTALL

`npm install @fourtwentyjs/tx`

# USAGE

- [Example](./examples/transactions.ts)

```typescript
import Transaction from '@fourtwentyjs/tx'

const txParams = {
  nonce: '0x00',
  smokePrice: '0x09184e72a000',
  smokeLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x00',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
}

const commmon = new Common({ chain: 'mainnet', hardfork: 'petersburg' })
const tx = Transaction.fromTxData(txParams, { common })

const privateKey = Buffer.from(
  'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109',
  'hex',
)

const signedTx = tx.sign(privateKey)

const serializedTx = signedTx.serialize()
```

## Fake Transaction

Creating a fake tansaction for use in e.g. `VM.runTx()` is simple, just overwrite `getSenderAddress()` with a custom [`Address`](https://github.com/420integrated/fourtwentyjs-util/blob/master/docs/classes/_address_.address.md) like so:

```typescript
import { Address } from 'fourtwentyjs-util'
import { Transaction } from '@fourtwentyjs/tx'

_getFakeTransaction(txParams: TxParams): Transaction {
  const from = Address.fromString(txParams.from)
  delete txParams.from

  const opts = { common: this._common }
  const tx = Transaction.fromTxData(txParams, opts)

  const fakeTx = Object.create(tx)
  // override getSenderAddress
  fakeTx.getSenderAddress = () => { return from }
  return fakeTx
}
```

# Chain and Hardfork Support

The `Transaction` constructor receives a parameter of an [`@fourtwentyjs/common`](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/common) object that lets you specify the chain and hardfork to be used. By default, `mainnet` and `petersburg` will be used.

## MuirGlacier Support

The `MuirGlacier` hardfork is supported by the library since the `v2.1.2` release.

## Istanbul Support

Support for reduced non-zero call data smoke prices from the `Istanbul` hardfork
([EIP-2028](https://eips.ethereum.org/EIPS/eip-2028)) has been added to the library
along with the `v2.1.1` release.

# EIP-155 support

`EIP-155` replay protection is activated since the `spuriousDragon` hardfork. To disable it, set the hardfork to one earlier than `spuriousDragon`.

# API

[Documentation](./docs/README.md)

# FourtwentyJS

See our organizational [documentation](https://fourtwentyjs.readthedocs.io) for an introduction to `FourtwentyJS` as well as information on current standards and best practices.

If you want to join for work or do improvements on the libraries have a look at our [contribution guidelines](https://fourtwentyjs.readthedocs.io/en/latest/contributing.html).

# LICENSE

[MPL-2.0](<https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2)>)

[discord-badge]: https://img.shields.io/static/v1?logo=discord&label=discord&message=Join&color=blue
[discord-link]: https://discord.gg/TNwARpR
[tx-npm-badge]: https://img.shields.io/npm/v/@fourtwentyjs/tx.svg
[tx-npm-link]: https://www.npmjs.com/package/@fourtwentyjs/tx
[tx-issues-badge]: https://img.shields.io/github/issues/420integrated/fourtwentyjs-vm/package:%20tx?label=issues
[tx-issues-link]: https://github.com/420integrated/fourtwentyjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+tx"
[tx-actions-badge]: https://github.com/420integrated/fourtwentyjs-vm/workflows/Tx%20Test/badge.svg
[tx-actions-link]: https://github.com/420integrated/fourtwentyjs-vm/actions?query=workflow%3A%22Tx+Test%22
[tx-coverage-badge]: https://codecov.io/gh/420integrated/fourtwentyjs-vm/branch/master/graph/badge.svg?flag=tx
[tx-coverage-link]: https://codecov.io/gh/420integrated/fourtwentyjs-vm/tree/master/packages/tx
