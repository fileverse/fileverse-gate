const { Member } = require('../../infra/database/models');
const config = require('../../../config');
const RegistryContract = require('./registryContract');
const registryInstance = new RegistryContract();

async function getMembers({ contractAddress, invokerAddress, chainId }) {
  const tokenId = await registryInstance.getTokenId(contractAddress);
  const members = await Member.find({
    contractAddress,
    tokenId,
    chainId,
    memberContractAddress: config.REGISTER_MEMBER_CONTRACT,
  }).project({ invokerAddress: true }).lean();
  return {
    contractAddress,
    invokerAddress,
    chainId,
    tokenId,
    members,
  };
}

module.exports = getMembers;
