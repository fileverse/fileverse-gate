const config = require('../../config');
const axios = require('axios');

class CovalentService {
  constructor() {
    this.basicAuth = `${config.COVALENT_API_KEY}:`;
    this.baseAddress = 'https://api.covalenthq.com/v1';
  }

  getChainCode({ chain }) {
    if (chain === 'goerli') {
      return '5';
    } else if (chain === 'polygon' || chain === 'polygon_mainnet') {
      return '137';
    } else if (chain === 'aurora') {
      return '1313161554';
    }
    return '1';
  }

  formatNft(nft, chain) {
    return {
      contractAddress: nft.contract_address,
      name: nft.contract_name,
      image: nft.logo_url,
      decimals: 0,
      symbol: nft.contract_ticker_symbol,
      chain,
      type: 'erc721',
    };
  }

  formatToken(token, chain) {
    return {
      contractAddress: token.contract_address,
      name: token.contract_name,
      symbol: token.contract_ticker_symbol,
      decimals: token.contract_decimals,
      image: token.logo_url,
      chain,
      type: 'erc20',
    };
  }

  // get Nfts from Moralis and return only those with name, symbol and image and unique address.
  async getOwnedNFTs(address, chain) {
    const chainCode = this.getChainCode({ chain });
    console.log({ chainCode });
    const apiResponse = await axios.request({
      method: 'get',
      url: `${this.baseAddress}/${chainCode}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=true`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.COVALENT_API_KEY}:`).toString('base64')}`
      }
    });
    const data = apiResponse.data.data;
    const filteredNFTs = data.items.filter((elem) => {
      const data = elem && elem.supports_erc && elem.supports_erc.includes("erc721");
      return data;
    });
    const nfts = filteredNFTs.map((nft) =>
      this.formatNft(nft, chain),
    );
    return nfts.filter((nft) => nft.name && nft.symbol);
  }

  async getOwnedTokens(address, chain) {
    const chainCode = this.getChainCode({ chain });
    const apiResponse = await axios.request({
      method: 'get',
      url: `${this.baseAddress}/${chainCode}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.COVALENT_API_KEY}:`).toString('base64')}`
      }
    });
    const data = apiResponse.data.data;
    const tokens = data.items.map((token) =>
      this.formatToken(token, chain),
    );
    return tokens.filter((token) => token.name && token.symbol);
  }
}

module.exports = CovalentService;
