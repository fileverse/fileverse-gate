const config = require('../../../config');

async function getStatus({ contractAddress, invokerAddress }) {
  return {
    contractAddress,
    invokerAddress,
    PORTAL_REGISTRY_ADDRESS: config.PORTAL_REGISTRY_ADDRESS,
    REGISTER_MEMBER_CONTRACT: config.REGISTER_MEMBER_CONTRACT,
  };
}

module.exports = getStatus;
