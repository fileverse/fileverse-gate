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
}

module.exports = MemberContract;
