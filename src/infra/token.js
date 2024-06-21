const Moralis = require('./moralis');
const Covalent = require('./covalent');

const moralisInstance = new Moralis();
const covalentInstance = new Covalent();

class Token {
  constructor() { }

  async getOwnedTokens({ chain, address }) {
    if (chain === "aurora") {
      return covalentInstance.getOwnedTokens(address, chain);
    }
    return moralisInstance.getOwnedTokens(address, chain);
  }

  async getTokenByMetadata({ chain, address, tokenAddress }) {
    if (chain === "aurora") {
      throw new Error("aurora chain not supported yet");
    }
    return moralisInstance.getTokenByMetadata(address, tokenAddress, chain);
  }
}

module.exports = Token;
