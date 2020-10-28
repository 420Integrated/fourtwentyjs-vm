import BN = require('bn.js')
import { PrecompileInput } from './types'
import { VmErrorResult, ExecResult, OOGResult } from '../evm'
import { ERROR, VmError } from '../../exceptions'
const assert = require('assert')
const {
  BLS12_381_ToG2Point,
  BLS12_381_ToFrPoint,
  BLS12_381_FromG2Point,
} = require('./util/bls12_381')

export default async function (opts: PrecompileInput): Promise<ExecResult> {
  assert(opts.data)

  const mcl = opts._VM._mcl

  const inputData = opts.data

  if (inputData.length == 0) {
    return VmErrorResult(new VmError(ERROR.BLS_12_381_INPUT_EMPTY), opts.smokeLimit) // follow G420s implementation
  }

  const numPairs = Math.floor(inputData.length / 288)

  const smokeUsedPerPair = new BN(opts._common.paramByEIP('smokePrices', 'Bls12381G2MulSmoke', 2537))
  const smokeDiscountArray = opts._common.paramByEIP('smokePrices', 'Bls12381MultiExpSmokeDiscount', 2537)
  const smokeDiscountMax = smokeDiscountArray[smokeDiscountArray.length - 1][1]
  let smokeDiscountMultiplier

  if (numPairs <= smokeDiscountArray.length) {
    if (numPairs == 0) {
      smokeDiscountMultiplier = 0 // this implicitly sets smokeUsed to 0 as per the EIP.
    } else {
      smokeDiscountMultiplier = smokeDiscountArray[numPairs - 1][1]
    }
  } else {
    smokeDiscountMultiplier = smokeDiscountMax
  }

  const smokeUsed = smokeUsedPerPair.imuln(numPairs).imuln(smokeDiscountMultiplier).idivn(1000)

  if (opts.smokeLimit.lt(smokeUsed)) {
    return OOGResult(opts.smokeLimit)
  }

  if (inputData.length % 288 != 0) {
    return VmErrorResult(new VmError(ERROR.BLS_12_381_INVALID_INPUT_LENGTH), opts.smokeLimit)
  }

  // prepare pairing list and check for mandatory zero bytes

  const zeroBytes16 = Buffer.alloc(16, 0)
  const zeroByteCheck = [
    [0, 16],
    [64, 80],
    [128, 144],
    [192, 208],
  ]

  const G2Array = []
  const FrArray = []

  for (let k = 0; k < inputData.length / 288; k++) {
    // zero bytes check
    const pairStart = 288 * k
    for (const index in zeroByteCheck) {
      const slicedBuffer = opts.data.slice(
        zeroByteCheck[index][0] + pairStart,
        zeroByteCheck[index][1] + pairStart
      )
      if (!slicedBuffer.equals(zeroBytes16)) {
        return VmErrorResult(new VmError(ERROR.BLS_12_381_POINT_NOT_ON_CURVE), opts.smokeLimit)
      }
    }
    let G2
    try {
      G2 = BLS12_381_ToG2Point(opts.data.slice(pairStart, pairStart + 256), mcl)
    } catch (e) {
      return VmErrorResult(e, opts.smokeLimit)
    }
    const Fr = BLS12_381_ToFrPoint(opts.data.slice(pairStart + 256, pairStart + 288), mcl)

    G2Array.push(G2)
    FrArray.push(Fr)
  }

  const result = mcl.mulVec(G2Array, FrArray)

  const returnValue = BLS12_381_FromG2Point(result)

  return {
    smokeUsed,
    returnValue: returnValue,
  }
}
