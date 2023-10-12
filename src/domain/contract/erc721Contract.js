const abi = require('./erc721ContractABI.json');
const { ethers } = require('ethers');
const provider = require('./provider');

class ERC721Contract {
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
    return balance && balance.toNumber();
  }
}

module.exports = ERC721Contract;
