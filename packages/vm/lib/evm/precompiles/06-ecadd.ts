import BN = require('bn.js')
import { PrecompileInput } from './types'
import { OOGResult, ExecResult } from '../evm'
const assert = require('assert')
const bn128 = require('rustbn.js')

export default function (opts: PrecompileInput): ExecResult {
  assert(opts.data)

  const inputData = opts.data

  const smokeUsed = new BN(opts._common.param('smokePrices', 'ecAdd'))
  if (opts.smokeLimit.lt(smokeUsed)) {
    return OOGResult(opts.smokeLimit)
  }

  const returnData = bn128.add(inputData)

  // check ecadd success or failure by comparing the output length
  if (returnData.length !== 64) {
    return OOGResult(opts.smokeLimit)
  }

  return {
    smokeUsed,
    returnValue: returnData,
  }
}
