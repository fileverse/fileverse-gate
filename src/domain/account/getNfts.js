const config = require('../../../config');
const NFT = require('../../infra/utils/nft');

const nftInstance = new NFT();

async function getNfts({ address, search, chain }) {
  const nfts = await nftInstance.getOwnedNFTs({
    address,
    chain: chain || config.CHAIN,
  });
  // eslint-disable-next-line
  return nfts.filter((nft) => nft.name.match(new RegExp(search, 'i')));
}

module.exports = getNfts;
