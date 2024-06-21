const config = require('../../../config');
const Token = require('../../infra/token');

const tokenInstance = new Token();

async function getTokens({ address, search, chain, tokenAddress }) {
  let tokens = [];

  if (token) {
    tokens = await tokenInstance.getTokenByMetadata({
      chain: chain,
      tokenAddress: tokenAddress,
    });
  }
  else {
    tokens = await tokenInstance.getOwnedTokens({
      address,
      chain: chain || config.CHAIN,
    });
  }
  // eslint-disable-next-line
  return tokens.filter((token) => token.name.match(new RegExp(search, 'i')));
}

module.exports = getTokens;
