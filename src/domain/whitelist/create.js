const { Whitelist } = require('../../infra/database/models')
import { ethers } from 'ethers';

async function resolveENS(ensName) {
    console.log(`Resolving ENS name: ${ensName}`)
    // Connect to the Ethereum provider
    const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth');

    // Fetch the resolver contract address
    const resolverAddress = await provider.resolveName(ensName);

    if (!resolverAddress) {
        throw new Error(`Could not resolve ENS name: ${ensName}`);
    }

    return resolverAddress;
}



async function create({ addressList, isEns, tag, addedBy }) {
    tag = tag || 'personal-invite'
    const bulkData = addressList.map((addr) => {
        if (isEns) {
            const resolverAddress = resolveENS(addr)
            return { invokerAddress: resolverAddress, tag: tag, addedBy: addedBy }
        }

        return { invokerAddress: addr, tag: tag, addedBy: addedBy }
    })

    await Whitelist.insertMany(bulkData)
}

module.exports = create;