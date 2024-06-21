const config = require('../../../config');
const NFT = require('../../infra/nft');

const nftInstance = new NFT();

async function getNfts({ address, search, chain, tokenAddress, tokenId }) {
  let nfts = [];

  if (tokenAddress && tokenId) {
    nfts = await nftInstance.getNftByMetadata({
      chain: chain,
      tokenAddress: tokenAddress,
      tokenId: tokenId,
    });
  } else {
    nfts = await nftInstance.getOwnedNFTs({
      address,
      chain: chain || config.CHAIN,
    });
  }

  // eslint-disable-next-line
  return nfts.filter((nft) => nft.name.match(new RegExp(search, 'i')));
}

module.exports = getNfts;
