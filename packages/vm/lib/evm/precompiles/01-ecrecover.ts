import BN = require('bn.js')
import { setLengthLeft, setLengthRight, ecrecover, publicToAddress } from 'fourtwentyjs-util'
import { PrecompileInput } from './types'
import { OOGResult, ExecResult } from '../evm'
const assert = require('assert')

export default function (opts: PrecompileInput): ExecResult {
  assert(opts.data)

  const smokeUsed = new BN(opts._common.param('smokePrices', 'ecRecover'))

  if (opts.smokeLimit.lt(smokeUsed)) {
    return OOGResult(opts.smokeLimit)
  }

  const data = setLengthRight(opts.data, 128)

  const msgHash = data.slice(0, 32)
  const v = data.slice(32, 64)
  const r = data.slice(64, 96)
  const s = data.slice(96, 128)

  let publicKey
  try {
    publicKey = ecrecover(msgHash, new BN(v).toNumber(), r, s)
  } catch (e) {
    return {
      smokeUsed,
      returnValue: Buffer.alloc(0),
    }
  }

  return {
    smokeUsed,
    returnValue: setLengthLeft(publicToAddress(publicKey), 32),
  }
}
