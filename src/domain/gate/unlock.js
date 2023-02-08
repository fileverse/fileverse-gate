const contract = require('../contract');
const { Gate } = require('../../infra/database/models');
const KMS = require('../../infra/kms');
const kms = new KMS();

async function getContractInstance(type, contractAddress, chainId) {
  let contractInstance = null;
  if (type === 'erc721') {
    const network = contract.networkFromChainId(chainId);
    contractInstance = new contract.ERC721Contract(contractAddress, network);
    return contractInstance;
  }
  if (type === 'erc20') {
    const network = contract.networkFromChainId(chainId);
    contractInstance = new contract.ERC20Contract(contractAddress, network);
    return contractInstance;
  }
  if (type === 'erc1155') {
    const network = contract.networkFromChainId(chainId);
    contractInstance = new contract.ERC1155Contract(contractAddress, network);
    return contractInstance;
  }
  return contractInstance;
}

async function checkBalance(balance, min, max) {
  return balance > min && balance < max;
}

async function validateSingleParam({ invokerAddress, param }) {
  const sections = param.split(':');
  const chainId = sections[0];
  const type = sections[1];
  const contractAddress = sections[2];
  const contractInstance =  await getContractInstance(type, contractAddress, chainId) 
  const balance = await contractInstance.balanceOf(invokerAddress);
  const min = sections[3];
  const max = sections[4];
  return balance;
}

function validateParams({ invokerAddress, chainId, params }) {
  if (params && params.length === 0) return false;

  return true;
}

async function unlock({ contractAddress, invokerAddress, chainId, gateId }) {
  const gate = await Gate.findOne({ gateId, contractAddress: contractAddress.toLowerCase() }).lean();
  if (!gate) {
    return null;
  }
  let decrypt = false;
  const { isMember, isCollaborator } = await contract.getStatus({ contractAddress, invokerAddress, chainId });
  if (gate.includeCollaborators && isCollaborator) {
    decrypt = true;
  }
  if (gate.includeMembers && isMember) {
    decrypt = true;
  }
  const valid = await validateParams({ invokerAddress, params: gate.params });
  if (valid) {
    decrypt = true;
  }
  if (!decrypt) {
    return null;
  }
  const gateKey = await kms.decrypt({ encryptedDataKey: gate.gateId, context: contractAddress.toLowerCase() });
  const dataToReturn = gate;
  dataToReturn.gateKey = gateKey;
  return dataToReturn;
}

module.exports = unlock;
