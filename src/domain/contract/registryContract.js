const config = require('../../../config');
const abi = require('./registryContractABI.json');
const { ethers } = require('ethers');
const provider = require('./provider');

class RegistryContract {
  constructor() {
    this.network = config.PORTAL_REGISTRY_NETWORK;
    this.contractAddress = config.PORTAL_REGISTRY_ADDRESS;
    this.contractABI = abi;
    this.networkProviderUrl = provider.getNetworkUrl(this.network);
    this.networkProvider = new ethers.providers.JsonRpcProvider(
      this.networkProviderUrl,
    );
    this.contractInstance = new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.networkProvider,
    );
  }

  async portalInfo(portalAddress) {
    const info = await this.contractInstance.portalInfo(portalAddress);
    return info;
  }

  async hasDeployedPortal(ownerAddress) {
    const deployedPortalList = await this.contractInstance.ownedPortal(
      ownerAddress,
      1,
      1,
    );
    return deployedPortalList.length > 0;
  }

  async getTokenId(portalAddress) {
    const info = await this.contractInstance.portalInfo(portalAddress);
    return info && info.tokenId && info.tokenId.toNumber();
  }
}

module.exports = RegistryContract;
