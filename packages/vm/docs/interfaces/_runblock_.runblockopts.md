[@fourtwentyjs/vm](../README.md) › ["runBlock"](../modules/_runblock_.md) › [RunBlockOpts](_runblock_.runblockopts.md)

# Interface: RunBlockOpts

Options for running a block.

## Hierarchy

* **RunBlockOpts**

## Index

### Properties

* [block](_runblock_.runblockopts.md#block)
* [generate](_runblock_.runblockopts.md#optional-generate)
* [root](_runblock_.runblockopts.md#optional-root)
* [skipBalance](_runblock_.runblockopts.md#optional-skipbalance)
* [skipBlockValidation](_runblock_.runblockopts.md#optional-skipblockvalidation)
* [skipNonce](_runblock_.runblockopts.md#optional-skipnonce)

## Properties

###  block

• **block**: *Block*

*Defined in [runBlock.ts:24](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L24)*

The @fourtwentyjs/block to process

___

### `Optional` generate

• **generate**? : *undefined | false | true*

*Defined in [runBlock.ts:36](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L36)*

Whether to generate the stateRoot. If `true` `runBlock` will check the
`stateRoot` of the block against the current Trie, check the `receiptsTrie`,
the `smokeUsed` and the `logsBloom` after running. If any does not match,
`runBlock` throws.
Defaults to `false`.

___

### `Optional` root

• **root**? : *Buffer*

*Defined in [runBlock.ts:28](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L28)*

Root of the state trie

___

### `Optional` skipBalance

• **skipBalance**? : *undefined | false | true*

*Defined in [runBlock.ts:50](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L50)*

If true, skips the balance check

___

### `Optional` skipBlockValidation

• **skipBlockValidation**? : *undefined | false | true*

*Defined in [runBlock.ts:42](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L42)*

If true, will skip "Block validation":
Block validation validates the header (with respect to the blockchain),
the transactions, the transaction trie and the uncle hash.

___

### `Optional` skipNonce

• **skipNonce**? : *undefined | false | true*

*Defined in [runBlock.ts:46](https://github.com/420integrated/fourtwentyjs-vm/blob/master/packages/vm/lib/runBlock.ts#L46)*

If true, skips the nonce check
