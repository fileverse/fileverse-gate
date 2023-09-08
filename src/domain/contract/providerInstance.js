const config = require('../../../config');
const { ethers } = require("ethers");
const provider = require('./provider');

class ProviderInstance {
    constructor() {
        this.network = 'gnosis_mainnet';
        this.networkProviderUrl = provider.getNetworkUrl(this.network);
        this.networkProvider = new ethers.providers.JsonRpcProvider(this.networkProviderUrl);
    }

    async isContract(address) {
        const code = await this.networkProvider.getCode(address);
        if (code === '0x') return false;
        return true;
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
        return 'eth_goerli';
    }
};

module.exports = ProviderInstance;
