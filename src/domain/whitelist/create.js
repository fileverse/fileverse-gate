const { Whitelist } = require('../../infra/database/models')
const { ethers } = require('ethers');

async function create({ addressList, tag, addedBy }) {
    tag = tag || 'personal-invite'

    let { validAddress, invalidAddress } = await filterAddresses(addressList);

    let bulkData = [];
    for (let addr of validAddress) {
        bulkData.push({ invokerAddress: addr, tag: tag, addedBy: addedBy })
    }
    await Whitelist.insertMany(bulkData)

    return { validAddress, invalidAddress };
}

async function filterAddresses(addressList) {
    let validAddress = [], invalidAddress = [];

    for (let addr of addressList) {
        const isValidAddress = ethers.utils.isAddress(addr)
        if (isValidAddress) {
            validAddress.push(addr)
            continue;
        }

        const mainnetrpc = process.env.ETH_MAINNET_RPC_URL;
        if (!mainnetrpc) {
            throw error('ETH_MAINNET_RPC_URL not found')
        }
        const provider = new ethers.providers.JsonRpcProvider(mainnetrpc);
        const resolvedAddress = await provider.resolveName(addr);

        if (resolvedAddress) {
            validAddress.push(resolvedAddress)
            continue;
        }

        invalidAddress.push(addr)
    }

    return { validAddress, invalidAddress }
}

module.exports = create;