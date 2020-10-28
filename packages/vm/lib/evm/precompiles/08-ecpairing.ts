import BN = require('bn.js')
import { PrecompileInput } from './types'
import { OOGResult, ExecResult } from '../evm'
const assert = require('assert')
const bn128 = require('rustbn.js')

export default function (opts: PrecompileInput): ExecResult {
  assert(opts.data)

  const inputData = opts.data
  // no need to care about non-divisible-by-192, because bn128.pairing will properly fail in that case
  const inputDataSize = Math.floor(inputData.length / 192)
  const smokeUsed = new BN(
    <number>opts._common.param('smokePrices', 'ecPairing') +
      inputDataSize * opts._common.param('smokePrices', 'ecPairingWord')
  )

  if (opts.smokeLimit.lt(smokeUsed)) {
    return OOGResult(opts.smokeLimit)
  }

  const returnData = bn128.pairing(inputData)

  // check ecpairing success or failure by comparing the output length
  if (returnData.length !== 32) {
    return OOGResult(opts.smokeLimit)
  }

  return {
    smokeUsed,
    returnValue: returnData,
  }
}
