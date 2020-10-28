import { AddressLike, BNLike, BufferLike } from 'fourtwentyjs-util'
import Common from '@fourtwentyjs/common'

/**
 * The options for initializing a Transaction.
 */
export interface TxOptions {
  /**
   * A Common object defining the chain and hardfork for the transaction.
   *
   * Default: `Common` object set to `mainnet` and the default hardfork as defined in the `Common` class.
   *
   * Current default hardfork: `istanbul`
   */
  common?: Common
}

/**
 * An object with an optional field with each of the transaction's values.
 */
export interface TxData {
  /**
   * The transaction's nonce.
   */
  nonce?: BNLike

  /**
   * The transaction's smoke price.
   */
  smokePrice?: BNLike

  /**
   * The transaction's smoke limit.
   */
  smokeLimit?: BNLike

  /**
   * The transaction's the address is sent to.
   */
  to?: AddressLike

  /**
   * The amount of Ether sent.
   */
  value?: BNLike

  /**
   * This will contain the data of the message or the init of a contract.
   */
  data?: BufferLike

  /**
   * EC recovery ID.
   */
  v?: BNLike

  /**
   * EC signature parameter.
   */
  r?: BNLike

  /**
   * EC signature parameter.
   */
  s?: BNLike
}

/**
 * An object with all of the transaction's values represented as strings.
 */
export interface JsonTx {
  nonce?: string
  smokePrice?: string
  smokeLimit?: string
  to?: string
  data?: string
  v?: string
  r?: string
  s?: string
  value?: string
}
