import BN = require('bn.js')
import { PrecompileInput } from './types'
import { OOGResult, ExecResult } from '../evm'
const assert = require('assert')

export default function (opts: PrecompileInput): ExecResult {
  assert(opts.data)

  const data = opts.data

  const smokeUsed = new BN(opts._common.param('smokePrices', 'identity'))
  smokeUsed.iadd(
    new BN(opts._common.param('smokePrices', 'identityWord')).imuln(Math.ceil(data.length / 32))
  )

  if (opts.smokeLimit.lt(smokeUsed)) {
    return OOGResult(opts.smokeLimit)
  }

  return {
    smokeUsed,
    returnValue: data,
  }
}
