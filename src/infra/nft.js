const Moralis = require('./moralis');
const Covalent = require('./covalent');

const moralisInstance = new Moralis();
const covalentInstance = new Covalent();

class NFT {
  constructor() {}

  async getOwnedNFTs({ chain, address }) {
    if (chain === "aurora") {
      return covalentInstance.getOwnedNFTs(address, chain);
    }
    return moralisInstance.getOwnedNFTs(address, chain);
  }
}

module.exports = NFT;
