const { Member } = require('../../infra/database/models');
const axios = require('axios');
const config = require('../../../config');
const { RegistryContract } = require('../contract');

const registryContractInstance = new RegistryContract();

async function registerMember({ invokerAddress, contractAddress, chainId }) {
    const memberContractAddress = config.REGISTER_MEMBER_CONTRACT;
    // get the tokenId of the contract in the registry
    const tokenId = await registryContractInstance.getTokenId(contractAddress);
    const apiResponse = await axios.post(
        config.REGISTER_MEMBER_WEBHOOK, {
            contractAddress: memberContractAddress,
            account: invokerAddress,
            tokenId: tokenId,
        }
    );
    const memberFound = await Member.findOne({
        contractAddress,
        invokerAddress,
        tokenId,
        chainId,
        memberContractAddress: config.REGISTER_MEMBER_CONTRACT,
    });
    if (!memberFound) {
        await (new Member({
            invokerAddress,
            contractAddress,
            chainId,
            tokenId,
            memberContractAddress,
        })).save();
    }
    return apiResponse.data;
}

module.exports = registerMember;
