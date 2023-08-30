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

module.exports = RegistryContract;
