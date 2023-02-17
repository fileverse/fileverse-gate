const Moralis = require('./moralis');
const Covalent = require('./covalent');

const moralisInstance = new Moralis();
const covalentInstance = new Covalent();

class Token {
  constructor() {}

  async getOwnedTokens({ chain, address }) {
    if (chain === "aurora") {
      return covalentInstance.getOwnedTokens(address, chain);
    }
    return moralisInstance.getOwnedTokens(address, chain);
  }
}

module.exports = Token;
