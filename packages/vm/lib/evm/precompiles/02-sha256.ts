import BN = require('bn.js')
import { sha256 } from 'fourtwentyjs-util'
import { PrecompileInput } from './types'
import { OOGResult, ExecResult } from '../evm'
const assert = require('assert')

export default function (opts: PrecompileInput): ExecResult {
  assert(opts.data)

  const data = opts.data

  const smokeUsed = new BN(opts._common.param('smokePrices', 'sha256'))
  smokeUsed.iadd(
    new BN(opts._common.param('smokePrices', 'sha256Word')).imuln(Math.ceil(data.length / 32))
  )

  if (opts.smokeLimit.lt(smokeUsed)) {
    return OOGResult(opts.smokeLimit)
  }

  return {
    smokeUsed,
    returnValue: sha256(data),
  }
}
