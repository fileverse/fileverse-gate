const abi = require('./erc1155ContractABI.json');
const { ethers } = require('ethers');
const provider = require('./provider');

class ERC1155Contract {
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

  async balanceOf(account, tokenId) {
    try {
      const balance = await this.contractInstance.balanceOf(account, tokenId);
      return balance && balance.toNumber();
    } catch (e) {
      console.log(e);
      // returning zero balance if anything fails
      return 0;
    }
  }
}

module.exports = ERC1155Contract;
