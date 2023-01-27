const axios = require('axios');
const config = require('../../../config');
const { RegistryContract } = require('../contract');

const registryContractInstance = new RegistryContract();

async function registerMember({ invokerAddress, contractAddress }) {
    // get the tokenId of the contract in the registry
    const tokenId = await registryContractInstance.getTokenId(contractAddress);
    const apiResponse = await axios.post(
        config.REGISTER_MEMBER_WEBHOOK, {
            address: invokerAddress,
            tokenId: tokenId,
        }
    );
    return apiResponse.data;
}

module.exports = registerMember;
