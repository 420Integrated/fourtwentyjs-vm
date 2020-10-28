import tape from 'tape'
import { Address, BN } from 'fourtwentyjs-util'
import VM from '../../../lib'
import Common from '@fourtwentyjs/common'

// Test cases source: https://gist.github.com/holiman/174548cad102096858583c6fbbb0649a
tape('EIP 2929: smoke cost tests', (t) => {
  const initialSmoke = new BN(0xffffffffff)
  const address = new Address(Buffer.from('000000000000000000000000636F6E7472616374', 'hex'))
  const common = new Common({ chain: 'mainnet', hardfork: 'berlin', eips: [2929] })

  const runTest = async function (test: any, st: tape.Test) {
    let i = 0
    let currentSmoke = initialSmoke
    const vm = new VM({ common })

    vm.on('step', function (step: any) {
      const smokeUsed = currentSmoke.sub(step.smokeLeft)
      currentSmoke = step.smokeLeft

      if (test.steps.length) {
        st.equal(
          step.opcode.name,
          test.steps[i].expectedOpcode,
          `Expected Opcode: ${test.steps[i].expectedOpcode}`
        )

        // Validates the smoke consumption of the (i - 1)th opcode
        // b/c the step event fires before smoke is debited.
        // The first opcode of every test should be +/- irrelevant
        // (ex: PUSH) and the last opcode is always STOP
        if (i > 0) {
          const expectedSmokeUsed = new BN(test.steps[i - 1].expectedSmokeUsed)
          st.equal(
            true,
            smokeUsed.eq(expectedSmokeUsed),
            `Opcode: ${
              test.steps[i - 1].expectedOpcode
            }, Smokee Used: ${smokeUsed}, Expected: ${expectedSmokeUsed}`
          )
        }
      }
      i++
    })

    const result = await vm.runCode({
      code: Buffer.from(test.code, 'hex'),
      smokeLimit: initialSmoke,
      address: address,
      origin: address,
    })

    const totalSmokeUsed = initialSmoke.sub(currentSmoke)
    st.equal(true, totalSmokeUsed.eq(new BN(test.totalSmokeUsed)))
    return result
  }

  // Checks EXT(codehash,codesize,balance) of precompiles, which should be 100,
  // and later checks the same operations twice against some non-precompiles. Those are
  // cheaper second time they are accessed. Lastly, it checks the BALANCE of origin and this.
  t.test('should charge for warm address loads correctly', async (st) => {
    const test = {
      code:
        '60013f5060023b506003315060f13f5060f23b5060f3315060f23f5060f33b5060f1315032315030315000',
      totalSmokeUsed: 8653,
      steps: [
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'EXTCODEHASH', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'EXTCODESIZE', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'BALANCE', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'EXTCODEHASH', expectedSmokeUsed: 2600 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'EXTCODESIZE', expectedSmokeUsed: 2600 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'BALANCE', expectedSmokeUsed: 2600 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'EXTCODEHASH', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'EXTCODESIZE', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'BALANCE', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'ORIGIN', expectedSmokeUsed: 2 },
        { expectedOpcode: 'BALANCE', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'ADDRESS', expectedSmokeUsed: 2 },
        { expectedOpcode: 'BALANCE', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'STOP', expectedSmokeUsed: 0 },
      ],
    }

    const result = await runTest(test, st)
    st.equal(undefined, result.exceptionError)
    st.end()
  })

  // Checks `extcodecopy( 0xff,0,0,0,0)` twice, (should be expensive first time),
  // and then does `extcodecopy( this,0,0,0,0)`.
  t.test('should charge for extcodecopy correctly', async (st) => {
    const test = {
      code: '60006000600060ff3c60006000600060ff3c600060006000303c00',
      totalSmokeUsed: 2835,
      steps: [
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'EXTCODECOPY', expectedSmokeUsed: 2600 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'EXTCODECOPY', expectedSmokeUsed: 100 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'ADDRESS', expectedSmokeUsed: 2 },
        { expectedOpcode: 'EXTCODECOPY', expectedSmokeUsed: 100 },
        { expectedOpcode: 'STOP', expectedSmokeUsed: 0 },
      ],
    }

    const result = await runTest(test, st)
    st.equal(undefined, result.exceptionError)
    st.end()
  })

  // Checks `sload( 0x1)` followed by `sstore(loc: 0x01, val:0x11)`,
  // then 'naked' sstore:`sstore(loc: 0x02, val:0x11)` twice, and `sload(0x2)`, `sload(0x1)`.
  t.test('should charge for sload and sstore correctly )', async (st) => {
    const test = {
      code: '6001545060116001556011600255601160025560025460015400',
      totalSmokeUsed: 44529,
      steps: [
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'SLOAD', expectedSmokeUsed: 2100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'SSTORE', expectedSmokeUsed: 20000 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'SSTORE', expectedSmokeUsed: 22100 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'SSTORE', expectedSmokeUsed: 100 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'SLOAD', expectedSmokeUsed: 100 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'SLOAD', expectedSmokeUsed: 100 },
        { expectedOpcode: 'STOP', expectedSmokeUsed: 0 },
      ],
    }

    const result = await runTest(test, st)
    st.equal(undefined, result.exceptionError)
    st.end()
  })

  // Calls the `identity`-precompile (cheap), then calls an account (expensive)
  // and `staticcall`s the sameaccount (cheap)
  t.test('should charge for pre-compiles and staticcalls correctly', async (st) => {
    const test = {
      code: '60008080808060046000f15060008080808060ff6000f15060008080808060ff6000fa5000',
      totalSmokeUsed: 2869,
      steps: [
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'CALL', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'CALL', expectedSmokeUsed: 2600 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'DUP1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'PUSH1', expectedSmokeUsed: 3 },
        { expectedOpcode: 'STATICCALL', expectedSmokeUsed: 100 },
        { expectedOpcode: 'POP', expectedSmokeUsed: 2 },
        { expectedOpcode: 'STOP', expectedSmokeUsed: 0 },
      ],
    }

    const result = await runTest(test, st)
    st.equal(undefined, result.exceptionError)
    st.end()
  })
})
