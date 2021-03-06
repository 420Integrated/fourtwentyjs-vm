import { Account, Address, toBuffer, setLengthLeft } from 'fourtwentyjs-util'
import { Block } from '@fourtwentyjs/block'
import Blockchain from '@fourtwentyjs/blockchain'
import Common from '@fourtwentyjs/common'
import VM from '../../'

const testData = require('./test-data')
const level = require('level')

async function main() {
  const common = new Common({ chain: testData.network.toLowerCase() })
  const validatePow = true
  const validateBlocks = true

  const blockchain = new Blockchain({
    common,
    validatePow,
    validateBlocks,
  })

  // When verifying PoW, setting this cache improves the
  // performance of subsequent runs of this script.
  if (validatePow) {
    blockchain.ethash!.cacheDB = level('./.cachedb')
  }

  const vm = new VM({ blockchain, common })

  await setupPreConditions(vm, testData)

  await setGenesisBlock(blockchain, common)

  await putBlocks(blockchain, common, testData)

  await vm.runBlockchain(blockchain)

  const blockchainHead = await vm.blockchain.getHead()

  console.log('--- Finished processing the BlockChain ---')
  console.log('New head:', '0x' + blockchainHead.hash().toString('hex'))
  console.log('Expected:', testData.lastblockhash)
}

async function setupPreConditions(vm: VM, testData: any) {
  await vm.stateManager.checkpoint()

  for (const addr of Object.keys(testData.pre)) {
    const { nonce, balance, storage, code } = testData.pre[addr]

    const address = new Address(Buffer.from(addr.slice(2), 'hex'))
    const account = Account.fromAccountData({ nonce, balance })
    await vm.stateManager.putAccount(address, account)

    for (const hexStorageKey of Object.keys(storage)) {
      const val = Buffer.from(storage[hexStorageKey], 'hex')
      const storageKey = setLengthLeft(Buffer.from(hexStorageKey, 'hex'), 32)

      await vm.stateManager.putContractStorage(address, storageKey, val)
    }

    const codeBuf = Buffer.from(code.slice(2), 'hex')

    await vm.stateManager.putContractCode(address, codeBuf)
  }

  await vm.stateManager.commit()
}

async function setGenesisBlock(blockchain: any, common: Common) {
  const header = testData.genesisBlockHeader
  const genesis = Block.genesis({ header }, { common })
  await blockchain.putGenesis(genesis)
}

async function putBlocks(blockchain: any, common: Common, testData: any) {
  for (const blockData of testData.blocks) {
    const blockRlp = toBuffer(blockData.rlp)
    const block = Block.fromRLPSerializedBlock(blockRlp, { common })
    await blockchain.putBlock(block)
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
