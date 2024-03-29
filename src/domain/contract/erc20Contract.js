const abi = require('./erc20ContractABI.json');
const { ethers } = require('ethers');
const provider = require('./provider');

class ERC20Contract {
  constructor(contractAddress, network) {
    this.contractAddress = contractAddress;
    this.contractABI = abi;
    this.networkProviderUrl = provider.getNetworkUrl(network);
    this.networkProvider = new ethers.providers.JsonRpcProvider(
      this.networkProviderUrl,
    );
    this.contractInstance = new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.networkProvider,
    );
  }

  async balanceOf(account) {
    const balance = await this.contractInstance.balanceOf(account);
    return balance;
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
    if (chainIdInNumber === 1313161554) {
      return 'aurora';
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

module.exports = ERC20Contract;
