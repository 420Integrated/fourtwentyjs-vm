import { Address, BN } from 'fourtwentyjs-util'

export default class TxContext {
  smokePrice: BN
  origin: Address

  constructor(smokePrice: BN, origin: Address) {
    this.smokePrice = smokePrice
    this.origin = origin
  }
}
