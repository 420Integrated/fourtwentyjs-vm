import tape from 'tape'
import { Address, BN } from 'fourtwentyjs-util'
import Common from '@fourtwentyjs/common'
import VM from '../../../../lib'
import { getPrecompile } from '../../../../lib/evm/precompiles'

tape('Precompiles: ECMUL', (t) => {
  t.test('ECMUL', async (st) => {
    const common = new Common({ chain: 'mainnet', hardfork: 'petersburg' })
    const vm = new VM({ common: common })
    const address = new Address(Buffer.from('0000000000000000000000000000000000000007', 'hex'))
    const ECMUL = getPrecompile(address, common)

    const result = await ECMUL({
      data: Buffer.alloc(0),
      smokeLimit: new BN(0xffff),
      _common: common,
      _VM: vm,
    })

    st.deepEqual(result.smokeUsed.toNumber(), 40000, 'should use petersburg smoke costs')
    st.end()
  })
})
