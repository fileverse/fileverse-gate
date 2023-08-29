const config = require('../../../config');
const abi = require('./memberContractABI.json');
const { ethers } = require('ethers');
const provider = require('./provider');

class MemberContract {
  constructor() {
    this.contractAddress = config.REGISTER_MEMBER_CONTRACT;
    this.contractABI = abi;
    this.networkProviderUrl = provider.getNetworkUrl(
      config.REGISTER_MEMBER_NETWORK,
    );
    this.networkProvider = new ethers.providers.JsonRpcProvider(
      this.networkProviderUrl,
    );
    this.contractInstance = new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.networkProvider,
    );
  }

  async balanceOf(account, tokenId) {
    const balance = await this.contractInstance.balanceOf(account, tokenId);
    return balance && balance.toNumber();
  }

  static networkFromChainId(chainId) {
    if (!chainId) {
      return 'eth_goerli';
    }
    const chainIdInNumber = Number(chainId);
    if (chainIdInNumber === 5) {
      return 'eth_goerli';
    }
    if (chainIdInNumber === 11155111) {
      return 'eth_sepolia';
    }
    if (chainIdInNumber === 8420) {
      return 'fileverse_testnet';
    }
    if (chainIdInNumber === 1) {
      return 'eth_mainnet';
    }
    if (chainIdInNumber === 137) {
      return 'polygon_mainnet';
    }
    if (chainIdInNumber === 100) {
      return 'gnosis_mainnet';
    }
    if (chainIdInNumber === 10200) {
      return 'gnosis_testnet';
    }
    if (chainIdInNumber === 534351) {
      return 'eth_scroll_sepolia';
    }
    return 'eth_goerli';
  }
}

module.exports = MemberContract;
