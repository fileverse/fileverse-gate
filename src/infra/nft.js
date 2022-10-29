const Moralis = require('./moralis');

const moralisInstance = new Moralis();

class NFT {
  constructor() {}

  async getOwnedNFTs({ chain, address }) {
    return moralisInstance.getOwnedNFTs(address, chain);
  }
}

module.exports = NFT;
