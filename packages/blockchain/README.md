# fourtwentyjs-blockchain

[![NPM Package][blockchain-npm-badge]][blockchain-npm-link]
[![GitHub Issues][blockchain-issues-badge]][blockchain-issues-link]
[![Actions Status][blockchain-actions-badge]][blockchain-actions-link]
[![Code Coverage][blockchain-coverage-badge]][blockchain-coverage-link]
[![Discord][discord-badge]][discord-link]

A module to store and interact with blocks.

# INSTALL

`npm install fourtwentyjs-blockchain`

# API

[Documentation](./docs/README.md)

# EXAMPLE

The following is an example to iterate through an existing G420 DB (needs `level` to be installed separately).

This module performs write operations. Making a backup of your data before trying it is recommended. Otherwise, you can end up with a compromised DB state.

```typescript
import Blockchain from '@fourtwentyjs/blockchain'

const level = require('level')

const g420DbPath = './chaindata' // Add your own path here. It will get modified, see remarks.

const db = level(g420DbPath)
const blockchain = new Blockchain({ db })

blockchain.iterator('i', (block) => {
  const blockNumber = block.header.number.toString()
  const blockHash = block.hash().toString('hex')
  console.log(`Block ${blockNumber}: ${blockHash}`)
})
```

**WARNING**: Since `@fourtwentyjs/blockchain` is also doing write operations on the DB for safety reasons only run this on a copy of your database, otherwise this might lead to a compromised DB state.

# FourtwentyJS

See our organizational [documentation](https://fourtwentyjs.readthedocs.io) for an introduction to `FourtwentyJS` as well as information on current standards and best practices.

If you want to join for work or do improvements on the libraries have a look at our [contribution guidelines](https://fourtwentyjs.readthedocs.io/en/latest/contributing.html).

[discord-badge]: https://img.shields.io/static/v1?logo=discord&label=discord&message=Join&color=blue
[discord-link]: https://discord.gg/TNwARpR
[blockchain-npm-badge]: https://img.shields.io/npm/v/@fourtwentyjs/blockchain.svg
[blockchain-npm-link]: https://www.npmjs.com/package/@fourtwentyjs/blockchain
[blockchain-issues-badge]: https://img.shields.io/github/issues/420integrated/fourtwentyjs-vm/package:%20blockchain?label=issues
[blockchain-issues-link]: https://github.com/420integrated/fourtwentyjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+blockchain"
[blockchain-actions-badge]: https://github.com/420integrated/fourtwentyjs-vm/workflows/Blockchain%20Test/badge.svg
[blockchain-actions-link]: https://github.com/420integrated/fourtwentyjs-vm/actions?query=workflow%3A%22Blockchain+Test%22
[blockchain-coverage-badge]: https://codecov.io/gh/420integrated/fourtwentyjs-vm/branch/master/graph/badge.svg?flag=blockchain
[blockchain-coverage-link]: https://codecov.io/gh/420integrated/fourtwentyjs-vm/tree/master/packages/blockchain
