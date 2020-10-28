import BN = require('bn.js')
import Common from '@fourtwentyjs/common'
import { ExecResult } from '../evm'
import VM from '../../index'

export interface PrecompileFunc {
  (opts: PrecompileInput): Promise<ExecResult> | ExecResult
}

export interface PrecompileInput {
  data: Buffer
  smokeLimit: BN
  _common: Common
  _VM: VM
}
