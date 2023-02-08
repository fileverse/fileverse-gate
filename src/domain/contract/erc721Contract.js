const abi = require('./erc721ContractABI.json');
const { ethers } = require("ethers");
const provider = require('./provider');

class ERC721Contract {
    constructor(contractAddress, network) {
        this.contractAddress = contractAddress;
        this.contractABI = abi;
        this.networkProviderUrl = provider.getNetworkUrl(network);
        this.networkProvider = new ethers.providers.JsonRpcProvider(this.networkProviderUrl);
        this.contractInstance = new ethers.Contract(this.contractAddress, this.contractABI, this.networkProvider);
    }

    async balanceOf(account) {
        const balance = await this.contractInstance.balanceOf(account);
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
        return 'eth_goerli';
    }
};

module.exports = ERC721Contract;
