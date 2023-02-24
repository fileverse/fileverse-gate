const abi = require('./erc1155ContractABI.json');
const { ethers } = require("ethers");
const provider = require('./provider');

class ERC1155Contract {
    constructor(contractAddress, network) {
        this.contractAddress = contractAddress;
        this.contractABI = abi;
        this.networkProviderUrl = provider.getNetworkUrl(network);
        this.networkProvider = new ethers.providers.JsonRpcProvider(this.networkProviderUrl);
        this.contractInstance = new ethers.Contract(this.contractAddress, this.contractABI, this.networkProvider);
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
        if (chainIdInNumber === 1313161554) {
            return 'aurora';
        }
        if (chainIdInNumber === 10200) {
            return 'gnosis_testnet';
        }
        return 'eth_goerli';
    }
};

module.exports = ERC1155Contract;
