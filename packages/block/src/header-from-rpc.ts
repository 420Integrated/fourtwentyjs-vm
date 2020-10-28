import { BlockHeader } from './header'
import { BlockOptions } from './types'

/**
 * Creates a new block header object from 420coin JSON RPC.
 *
 * @param blockParams - 420coin JSON RPC of block (fourtwenty_getBlockByNumber)
 * @param chainOptions - An object describing the blockchain
 */
export default function blockHeaderFromRpc(blockParams: any, options?: BlockOptions) {
  const {
    parentHash,
    sha3Uncles,
    miner,
    stateRoot,
    transactionsRoot,
    receiptRoot,
    receiptsRoot,
    logsBloom,
    difficulty,
    number,
    smokeLimit,
    smokeUsed,
    timestamp,
    extraData,
    mixHash,
    nonce,
  } = blockParams

  const blockHeader = BlockHeader.fromHeaderData(
    {
      parentHash,
      uncleHash: sha3Uncles,
      coinbase: miner,
      stateRoot,
      transactionsTrie: transactionsRoot,
      receiptTrie: receiptRoot || receiptsRoot,
      bloom: logsBloom,
      difficulty,
      number,
      smokeLimit,
      smokeUsed,
      timestamp,
      extraData,
      mixHash,
      nonce,
    },
    options
  )

  return blockHeader
}
