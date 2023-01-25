const axios = require('axios');
const config = require('../../../config');


async function registerMember({ invokerAddress, contractAddress }) {
    // get the tokenId of the contract in the registry
    const apiResponse = await axios.post(
        config.REGISTER_MEMBER_WEBHOOK, {
            invokerAddress,
            contractAddress,
            tokenId,
        }
    );
    console.log(apiResponse);
}

module.exports = registerMember;
