const config = require('../../config');
const axios = require('axios');
const Big = require('big.js');
const _ = require('lodash');

class MoralisService {
  constructor() {
    this.headers = {
      "X-API-Key": config.MORALIS_API_KEY,
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
    axios.defaults.headers.get['x-api-key'] = config.MORALIS_API_KEY;
    this.baseAddress = 'https://deep-index.moralis.io/api/v2';
    this.baseAddressV2_2 = 'https://deep-index.moralis.io/api/v2.2';
  }

  getChainCode({ chain }) {
    if (chain === 'goerli') {
      return '0x5';
    } else if (chain === 'polygon' || chain === 'polygon_mainnet') {
      return '0x89';
    }
    return '0x1';
  }

  async getContractBalance({ address, contractAddress, tokenType, chain }) {
    const chainCode = this.getChainCode({ chain });
    if (!contractAddress || !address) return 0;
    let currentBal = 0;
    if (tokenType.toLowerCase() === 'erc20') {
      const apiResponse = await axios.get(
        `${this.baseAddress}/${address}/erc20?token_addresses=${contractAddress}&chain=${chainCode}`,
      );
      apiResponse.data.map((token) => {
        const baseNumber = new Big(token.balance);
        const divideBy = new Big(10).pow(parseInt(token.decimals, 10));
        const correctedBalance = Number(baseNumber.div(divideBy).toFixed(2));
        currentBal += correctedBalance;
      });
    }
    if (tokenType.toLowerCase() === 'erc721') {
      const apiResponse = await axios.get(
        `${this.baseAddress}/${address}/nft/${contractAddress}?chain=${chainCode}&format=decimal`,
      );
      apiResponse.data.result.map((nft) => {
        currentBal += parseInt(nft.amount, 10);
      });
    }
    return currentBal;
  }

  formatNft(nft, chain) {
    const metadata = JSON.parse(nft.metadata);
    return {
      contractAddress: nft.token_address,
      name: (metadata && metadata.name) || nft.name,
      image: (metadata && metadata.image) || nft.image,
      decimals: 0,
      symbol: nft.symbol,
      chain,
      type: 'erc721',
    };
  }

  formatToken(token, chain) {
    return {
      contractAddress: token.token_address,
      name: token.name,
      symbol: token.symbol,
      decimals: token.decimals,
      image: token.thumbnail,
      chain,
      type: 'erc20',
    };
  }

  // get Nfts from Moralis and return only those with name, symbol and image and unique address.
  async getOwnedNFTs(address, chain) {
    const chainCode = this.getChainCode({ chain });
    const apiResponse = await axios.get(
      `${this.baseAddress}/${address}/nft?chain=${chainCode}&format=decimal`,
    );
    const nfts = apiResponse.data.result.map((nft) =>
      this.formatNft(nft, chain),
    );
    const filteredNfts = nfts.filter((nft) => nft.name && nft.symbol);
    return _.uniqBy(filteredNfts, 'contractAddress');
  }

  async getOwnedTokens(address, chain) {
    const chainCode = this.getChainCode({ chain });
    const apiResponse = await axios.get(
      `${this.baseAddress}/${address}/erc20?chain=${chainCode}`,
    );
    const tokens = apiResponse.data.map((token) =>
      this.formatToken(token, chain),
    );
    return tokens.filter((token) => token.name && token.symbol);
  }

  async getTokenByMetadata(address, tokenAddress, chain) {
    const chainCode = this.getChainCode({ chain });
    const url = `${this.baseAddress}/${address}/erc20?chain=${chainCode}&tokenAddresses%5B0%5D=${tokenAddress}`

    const config = {
      method: 'get',
      url: url,
      headers: this.headers,
    }
    const apiResponse = await axios.request(config)
    const tokens = apiResponse.data.map((token) =>
      this.formatToken(token, chain),
    );
    return tokens.filter((token) => token.name && token.symbol);
  }

  async getNftByMetadata(tokenAddress, tokenId, chain) {
    const chainCode = this.getChainCode({ chain });

    let data = JSON.stringify({
      "tokens": [
        {
          "token_address": tokenAddress,
          "token_id": tokenId
        }
      ],
      "normalizeMetadata": false,
      "media_items": true
    });

    let config = {
      method: 'post',
      url: `${this.baseAddressV2_2}/nft/getMultipleNFTs?chain=${chainCode}`,
      headers: this.headers,
      data: data
    };

    const apiResponse = await axios.request(config);
    const tokens = apiResponse.data.map((token) =>
      this.formatNft(token, chain),
    );
    return tokens.filter((token) => token.name && token.symbol);
  }
}

module.exports = MoralisService;
