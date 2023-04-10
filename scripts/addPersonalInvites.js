const config = require('../config');
const data = require('./data/personal.json');
const { ethers } = require('ethers');
const { Whitelist } = require('../src/infra/database/models');

async function processBatch(batch = []) {
  for (let i = 0; i < batch.length; i++) {
    const currentElement = batch[i];
    const whitelist = new Whitelist({ invokerAddress: currentElement, tag: 'personal_invites' });
    // await whitelist.save();
  }
}

async function wait(time) {
  await new Promise(resolve => setTimeout(resolve, time));
}

async function resolveENS(ens) {
  const provider = new ethers.providers.JsonRpcProvider(config.ETH_MAINNET_RPC_URL);
  const address = await provider.resolveName(ens);
  return address;
}

class Script {
  static async run() {
    const { addresses } = data;
    let batch = [];
    const batchSize = 50;
    for(let i = 0; i < addresses.length; i++) {
      const currentIndex = i;
      let address = addresses[currentIndex].shift();
      if (address.includes('.')) {
        address = await resolveENS(address);
      }
      const isAddress = ethers.utils.isAddress(address);
      if (isAddress) {
        batch.push(address);
        if (batch.length >= batchSize) {
          // process batch
          await processBatch(batch);
          await wait(500);
          batch = [];
          console.log('Percent Done: ', (i / addresses.length) * 100);
        }
      }
    }
    // process last batch 
    await processBatch(batch);
  }
}

(async () => {
  try {
    console.log('Script run started!');
    await Script.run();
    console.log('Script run complete!');
    process.exit(0);
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
})();
