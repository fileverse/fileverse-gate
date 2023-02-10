const ethers = require('ethers');
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
  const bigIntBalance = ethers.BigNumber.from(balance);
  const withinRange = true;
  const range = {
    min: min === '*' ? null : ethers.BigNumber.from(min),
    max: max === '*' ? null : ethers.BigNumber.from(max),
  };
  if (range.min && bigIntBalance.lt(range.min)) {
    withinRange = false;
  } 
  if (range.max && bigIntBalance.gt(range.max)) {
    withinRange = false;
  } 
  return withinRange;
}

async function validateERC1155(contractInstance, tokenId, invokerAddress, min, max) {
  const balance = await contractInstance.balanceOf(invokerAddress, tokenId);
  const valid = await checkBalance(balance, min, max);
  return valid;
}

async function validateERC721(contractInstance, invokerAddress, min, max) {
  const balance = await contractInstance.balanceOf(invokerAddress).catch(console.log);
  const valid = await checkBalance(balance, min, max);
  return valid;
}

async function validateERC20(contractInstance, invokerAddress, min, max) {
  const balance = await contractInstance.balanceOf(invokerAddress);
  const valid = await checkBalance(balance, min, max);
  return valid;
}

async function validateSingleParam({ invokerAddress, param }) {
  const sections = param.split(':');
  if (sections.length < 6) {
    sections.unshift('1');
  }
  const chainId = parseInt(sections[0], 10);
  const type = sections[1];
  const contractAddress = sections[2];
  const contractInstance = await getContractInstance(type, contractAddress, chainId);
  const tokenId = sections[3];
  const min = sections[4];
  const max = sections[5];
  let valid = false;
  if (type === 'erc1155') {
    valid = await validateERC1155(contractInstance, tokenId, invokerAddress, min, max);
  } else if (type === 'erc721') {
    valid = await validateERC721(contractInstance, invokerAddress, min, max);
  } else if (type === 'erc20') {
    valid = await validateERC20(contractInstance, invokerAddress, min, max);
  }
  return valid;
}

async function validateParams({ invokerAddress, params }) {
  if (params && params.length === 0) return false;
  const valid = await validateSingleParam({ invokerAddress, param: params[0] });
  return valid;
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
