import BN = require('bn.js')
import { PrecompileInput } from './types'
import { VmErrorResult, ExecResult, OOGResult } from '../evm'
import { ERROR, VmError } from '../../exceptions'
const assert = require('assert')
const {
  BLS12_381_ToG1Point,
  BLS12_381_ToFrPoint,
  BLS12_381_FromG1Point,
} = require('./util/bls12_381')

export default async function (opts: PrecompileInput): Promise<ExecResult> {
  assert(opts.data)

  const mcl = opts._VM._mcl

  const inputData = opts.data

  if (inputData.length == 0) {
    return VmErrorResult(new VmError(ERROR.BLS_12_381_INPUT_EMPTY), opts.smokeLimit) // follow G420s implementation
  }

  const numPairs = Math.floor(inputData.length / 160)

  const smokeUsedPerPair = new BN(opts._common.paramByEIP('smokePrices', 'Bls12381G1MulSmoke', 2537))
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

  if (inputData.length % 160 != 0) {
    return VmErrorResult(new VmError(ERROR.BLS_12_381_INVALID_INPUT_LENGTH), opts.smokeLimit)
  }

  // prepare pairing list and check for mandatory zero bytes

  const zeroBytes16 = Buffer.alloc(16, 0)
  const zeroByteCheck = [
    [0, 16],
    [64, 80],
  ]

  const G1Array = []
  const FrArray = []

  for (let k = 0; k < inputData.length / 160; k++) {
    // zero bytes check
    const pairStart = 160 * k
    for (const index in zeroByteCheck) {
      const slicedBuffer = opts.data.slice(
        zeroByteCheck[index][0] + pairStart,
        zeroByteCheck[index][1] + pairStart
      )
      if (!slicedBuffer.equals(zeroBytes16)) {
        return VmErrorResult(new VmError(ERROR.BLS_12_381_POINT_NOT_ON_CURVE), opts.smokeLimit)
      }
    }
    let G1
    try {
      G1 = BLS12_381_ToG1Point(opts.data.slice(pairStart, pairStart + 128), mcl)
    } catch (e) {
      return VmErrorResult(e, opts.smokeLimit)
    }
    const Fr = BLS12_381_ToFrPoint(opts.data.slice(pairStart + 128, pairStart + 160), mcl)

    G1Array.push(G1)
    FrArray.push(Fr)
  }

  const result = mcl.mulVec(G1Array, FrArray)

  const returnValue = BLS12_381_FromG1Point(result)

  return {
    smokeUsed,
    returnValue: returnValue,
  }
}
