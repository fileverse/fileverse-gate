const contract = require('../contract');
const { Gate } = require('../../infra/database/models');
const KMS = require('../../infra/kms');
const kms = new KMS();

function validateParams({ invokerAddress, params }) {
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
