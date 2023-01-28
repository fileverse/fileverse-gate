const config = require('../../../config');
const { RegistryContract } = require('../contract');
const registryInstance = new RegistryContract();

async function getStatus({ contractAddress, invokerAddress, chainId }) {
  const tokenId = await registryInstance.getTokenId(contractAddress);
  return {
    contractAddress,
    invokerAddress,
    chainId,
    tokenId,
    PORTAL_REGISTRY_ADDRESS: config.PORTAL_REGISTRY_ADDRESS,
    PORTAL_REGISTRY_NETWORK: config.PORTAL_REGISTRY_NETWORK,
    REGISTER_MEMBER_CONTRACT: config.REGISTER_MEMBER_CONTRACT,
  };
}

module.exports = getStatus;
