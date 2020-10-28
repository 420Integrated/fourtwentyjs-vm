import BN = require('bn.js')
import { ripemd160 } from 'fourtwentyjs-util'
import { PrecompileInput } from './types'
import { OOGResult, ExecResult } from '../evm'
const assert = require('assert')

export default function (opts: PrecompileInput): ExecResult {
  assert(opts.data)

  const data = opts.data

  const smokeUsed = new BN(opts._common.param('smokePrices', 'ripemd160'))
  smokeUsed.iadd(
    new BN(opts._common.param('smokePrices', 'ripemd160Word')).imuln(Math.ceil(data.length / 32))
  )

  if (opts.smokeLimit.lt(smokeUsed)) {
    return OOGResult(opts.smokeLimit)
  }

  return {
    smokeUsed,
    returnValue: ripemd160(data, true),
  }
}
