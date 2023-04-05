const data = require('./data/grant4846.json');
const { ethers } = require('ethers');
const { Whitelist } = require('../src/infra/database/models');

async function processBatch(batch = []) {
  for (let i = 0; i < batch.length; i++) {
    const currentElement = batch[i];
    const whitelist = new Whitelist({ invokerAddress: currentElement, tag: 'gitcoin' });
    // await whitelist.save();
  }
}

async function wait(time) {
  await new Promise(resolve => setTimeout(resolve, time));
}

class Script {
  static async run() {
    const { addresses } = data;
    let batch = [];
    const batchSize = 50;
    for(let i = 0; i < addresses.length; i++) {
      const currentIndex = i;
      const address = addresses[currentIndex].shift();
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
