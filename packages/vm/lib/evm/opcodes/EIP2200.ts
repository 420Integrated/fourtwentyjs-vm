import BN = require('bn.js')
import { RunState } from './../interpreter'
import { ERROR } from '../../exceptions'
import { adjustSstoreSmokeEIP2929 } from './EIP2929'
import { trap } from './util'

/**
 * Adjusts smoke usage and refunds of SStore ops per EIP-2200 (Istanbul)
 *
 * @param {RunState} runState
 * @param {any}      found
 * @param {Buffer}   value
 */
export function updateSstoreSmokeEIP2200(runState: RunState, found: any, value: Buffer, key: Buffer) {
  if (runState._common.gteHardfork('istanbul')) {
    const original = found.original
    const current = found.current
    // Fail if not enough smoke is left
    if (
      runState.eei.getSmokeLeft().lten(runState._common.param('smokePrices', 'sstoreSentrySmokeEIP2200'))
    ) {
      trap(ERROR.OUT_OF_GAS)
    }

    // Noop
    if (current.equals(value)) {
      const sstoreNoopCost = runState._common.param('smokePrices', 'sstoreNoopSmokeEIP2200')
      return runState.eei.useSmoke(
        new BN(adjustSstoreSmokeEIP2929(runState, key, sstoreNoopCost, 'noop'))
      )
    }
    if (original.equals(current)) {
      // Create slot
      if (original.length === 0) {
        return runState.eei.useSmoke(
          new BN(runState._common.param('smokePrices', 'sstoreInitSmokeEIP2200'))
        )
      }
      // Delete slot
      if (value.length === 0) {
        runState.eei.refundSmoke(
          new BN(runState._common.param('smokePrices', 'sstoreClearRefundEIP2200'))
        )
      }
      // Write existing slot
      return runState.eei.useSmoke(
        new BN(runState._common.param('smokePrices', 'sstoreCleanSmokeEIP2200'))
      )
    }
    if (original.length > 0) {
      if (current.length === 0) {
        // Recreate slot
        runState.eei.subRefund(
          new BN(runState._common.param('smokePrices', 'sstoreClearRefundEIP2200'))
        )
      } else if (value.length === 0) {
        // Delete slot
        runState.eei.refundSmoke(
          new BN(runState._common.param('smokePrices', 'sstoreClearRefundEIP2200'))
        )
      }
    }
    if (original.equals(value)) {
      if (original.length === 0) {
        // Reset to original non-existent slot
        const sstoreInitRefund = runState._common.param('smokePrices', 'sstoreInitRefundEIP2200')
        runState.eei.refundSmoke(
          new BN(adjustSstoreSmokeEIP2929(runState, key, sstoreInitRefund, 'initRefund'))
        )
      } else {
        // Reset to original existing slot
        const sstoreCleanRefund = runState._common.param('smokePrices', 'sstoreCleanRefundEIP2200')
        runState.eei.refundSmoke(
          new BN(adjustSstoreSmokeEIP2929(runState, key, sstoreCleanRefund, 'cleanRefund'))
        )
      }
    }
    // Dirty update
    return runState.eei.useSmoke(new BN(runState._common.param('smokePrices', 'sstoreDirtySmokeEIP2200')))
  } else {
    const sstoreResetCost = runState._common.param('smokePrices', 'sstoreReset')
    if (value.length === 0 && !found.length) {
      runState.eei.useSmoke(new BN(adjustSstoreSmokeEIP2929(runState, key, sstoreResetCost, 'reset')))
    } else if (value.length === 0 && found.length) {
      runState.eei.useSmoke(new BN(adjustSstoreSmokeEIP2929(runState, key, sstoreResetCost, 'reset')))
      runState.eei.refundSmoke(new BN(runState._common.param('smokePrices', 'sstoreRefund')))
    } else if (value.length !== 0 && !found.length) {
      runState.eei.useSmoke(new BN(runState._common.param('smokePrices', 'sstoreSet')))
    } else if (value.length !== 0 && found.length) {
      runState.eei.useSmoke(new BN(adjustSstoreSmokeEIP2929(runState, key, sstoreResetCost, 'reset')))
    }
  }
}
