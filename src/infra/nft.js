const Moralis = require('./moralis');
const Covalent = require('./covalent');

const moralisInstance = new Moralis();
const covalentInstance = new Covalent();

class NFT {
  constructor() { }

  async getOwnedNFTs({ chain, address }) {
    if (chain === "aurora") {
      return covalentInstance.getOwnedNFTs(address, chain);
    }
    return moralisInstance.getOwnedNFTs(address, chain);
  }

  async getNftByMetadata({ chain, tokneAddress, tokenId }) {
    if (chain === "aurora") {
      throw new Error("aurora chain not supported yet");
    }
    return moralisInstance.getNftByMetadata(tokneAddress, tokenId, chain);
  }
}

module.exports = NFT;
