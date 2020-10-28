import { Account, BN } from 'fourtwentyjs-util'
import Blockchain from '@fourtwentyjs/blockchain'
import VM from '../../lib/index'
import { VMOpts } from '../../lib'

const level = require('level-mem')

export function createAccount(nonce: BN = new BN(0), balance: BN = new BN(0xfff384)) {
  return new Account(nonce, balance)
}

export function setupVM(opts: VMOpts = {}) {
  const db = level()
  const common = opts.common
  if (!opts.blockchain) {
    opts.blockchain = new Blockchain({ db, validateBlocks: false, validatePow: false, common })
  }
  return new VM(opts)
}
