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
}

module.exports = ERC20Contract;
