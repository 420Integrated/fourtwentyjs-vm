# fourtwentyjs-block

[![NPM Package][block-npm-badge]][block-npm-link]
[![GitHub Issues][block-issues-badge]][block-issues-link]
[![Actions Status][block-actions-badge]][block-actions-link]
[![Code Coverage][block-coverage-badge]][block-coverage-link]
[![Discord][discord-badge]][discord-link]

Implements schema and functions related to 420coin's block.

# INSTALL

`npm install @fourtwentyjs/block`

# BROWSER

This module works with `browserify`.

# API

[Documentation](./docs/README.md)

# TESTING

Tests in the `tests` directory are partly outdated and testing is primarily done by running the `BlockchainTests` from within the [fourtwentyjs-vm](https://github.com/420integrated/fourtwentyjs-vm/tree/master/packages/vm#synopsis) package.

To avoid bloating this repository with [ethereum/tests](https://github.com/420integrated/go-420coin/tests) JSON files, we usually copy specific JSON files and wrap them with some metadata (source, date, commit hash). There's a helper to aid in that process and can be found at [wrap-ethereum-test.sh](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/block/scripts/wrap-ethereum-test.sh).

# FourtwentyJS

See our organizational [documentation](https://fourtwentyjs.readthedocs.io) for an introduction to `FourtwentyJS` as well as information on current standards and best practices.

If you want to join for work or do improvements on the libraries have a look at our [contribution guidelines](https://fourtwentyjs.readthedocs.io/en/latest/contributing.html).

# LICENSE

[MPL-2.0](<https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2)>)

[discord-badge]: https://img.shields.io/static/v1?logo=discord&label=discord&message=Join&color=blue
[discord-link]: https://discord.gg/TNwARpR
[block-npm-badge]: https://img.shields.io/npm/v/@fourtwentyjs/block.svg
[block-npm-link]: https://www.npmjs.com/package/@fourtwentyjs/block
[block-issues-badge]: https://img.shields.io/github/issues/420integrated/fourtwentyjs-vm/package:%20block?label=issues
[block-issues-link]: https://github.com/420integrated/fourtwentyjs-vm/issues?q=is%3Aopen+is%3Aissue+label%3A"package%3A+block"
[block-actions-badge]: https://github.com/420integrated/fourtwentyjs-vm/workflows/Block%20Test/badge.svg
[block-actions-link]: https://github.com/420integrated/fourtwentyjs-vm/actions?query=workflow%3A%22Block+Test%22
[block-coverage-badge]: https://codecov.io/gh/420integrated/fourtwentyjs-vm/branch/master/graph/badge.svg?flag=block
[block-coverage-link]: https://codecov.io/gh/420integrated/fourtwentyjs-vm/tree/master/packages/block
