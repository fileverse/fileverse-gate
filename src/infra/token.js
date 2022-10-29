const Moralis = require('./moralis');

const moralisInstance = new Moralis();

class Token {
  constructor() {}

  async getOwnedTokens({ chain, address }) {
    return moralisInstance.getOwnedTokens(address, chain);
  }
}

module.exports = Token;
