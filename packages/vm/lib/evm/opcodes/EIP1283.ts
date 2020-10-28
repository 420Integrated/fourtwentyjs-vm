import BN = require('bn.js')
import { RunState } from './../interpreter'

/**
 * Adjusts smoke usage and refunds of SStore ops per EIP-1283 (Constantinople)
 *
 * @param {RunState} runState
 * @param {any}      found
 * @param {Buffer}   value
 */
export function updateSstoreSmokeEIP1283(runState: RunState, found: any, value: Buffer) {
  if (runState._common.hardfork() === 'constantinople') {
    const original = found.original
    const current = found.current
    if (current.equals(value)) {
      // If current value equals new value (this is a no-op), 200 smoke is deducted.
      runState.eei.useSmoke(new BN(runState._common.param('smokePrices', 'netSstoreNoopSmoke')))
      return
    }
    // If current value does not equal new value
    if (original.equals(current)) {
      // If original value equals current value (this storage slot has not been changed by the current execution context)
      if (original.length === 0) {
        // If original value is 0, 20000 smoke is deducted.
        return runState.eei.useSmoke(new BN(runState._common.param('smokePrices', 'netSstoreInitSmoke')))
      }
      if (value.length === 0) {
        // If new value is 0, add 15000 smoke to refund counter.
        runState.eei.refundSmoke(new BN(runState._common.param('smokePrices', 'netSstoreClearRefund')))
      }
      // Otherwise, 5000 smoke is deducted.
      return runState.eei.useSmoke(new BN(runState._common.param('smokePrices', 'netSstoreCleanSmoke')))
    }
    // If original value does not equal current value (this storage slot is dirty), 200 smoke is deducted. Apply both of the following clauses.
    if (original.length !== 0) {
      // If original value is not 0
      if (current.length === 0) {
        // If current value is 0 (also means that new value is not 0), remove 15000 smoke from refund counter. We can prove that refund counter will never go below 0.
        runState.eei.subRefund(new BN(runState._common.param('smokePrices', 'netSstoreClearRefund')))
      } else if (value.length === 0) {
        // If new value is 0 (also means that current value is not 0), add 15000 smoke to refund counter.
        runState.eei.refundSmoke(new BN(runState._common.param('smokePrices', 'netSstoreClearRefund')))
      }
    }
    if (original.equals(value)) {
      // If original value equals new value (this storage slot is reset)
      if (original.length === 0) {
        // If original value is 0, add 19800 smoke to refund counter.
        runState.eei.refundSmoke(
          new BN(runState._common.param('smokePrices', 'netSstoreResetClearRefund'))
        )
      } else {
        // Otherwise, add 4800 smoke to refund counter.
        runState.eei.refundSmoke(new BN(runState._common.param('smokePrices', 'netSstoreResetRefund')))
      }
    }
    return runState.eei.useSmoke(new BN(runState._common.param('smokePrices', 'netSstoreDirtySmoke')))
  }
}
