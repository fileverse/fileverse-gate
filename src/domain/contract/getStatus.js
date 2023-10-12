const config = require('../../../config');
const PortalContract = require('./portalContract');
const RegistryContract = require('./registryContract');
const MemberContract = require('./memberContract');
const networkFromChainId = require('./networkFromChainId');
const registryInstance = new RegistryContract();
const memberInstance = new MemberContract();

async function getStatus({ contractAddress, invokerAddress, chainId }) {
  const tokenId = await registryInstance.getTokenId(contractAddress);
  const balance = await memberInstance.balanceOf(invokerAddress, tokenId);
  const network = await networkFromChainId(chainId);
  const portalInstance = new PortalContract(contractAddress, network);
  const isCollaborator = await portalInstance.isCollaborator(invokerAddress);
  return {
    contractAddress,
    invokerAddress,
    chainId,
    tokenId,
    isMember: !!balance,
    isCollaborator,
    PORTAL_REGISTRY_ADDRESS: config.PORTAL_REGISTRY_ADDRESS,
    PORTAL_REGISTRY_NETWORK: config.PORTAL_REGISTRY_NETWORK,
    REGISTER_MEMBER_CONTRACT: config.REGISTER_MEMBER_CONTRACT,
  };
}

module.exports = getStatus;
