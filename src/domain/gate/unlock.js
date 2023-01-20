const Contract = require('../contract');
const { Gate } = require('../../infra/database/models');
const KMS = require('../../infra/kms');
const kms = new KMS();

function validateParams({ invokerAddress, params }) {
  return true;
}

async function unlock({ contractAddress, invokerAddress, chainId, gateId }) {
  const gate = await Gate.findOne({ gateId, contractAddress: contractAddress.toLowerCase() }).lean();
  if (!gate) {
    return null;
  }
  let decrypt = false;
  const network = Contract.networkFromChainId(chainId);
  const contract = new Contract(contractAddress, network);
  const isCollaborator = await contract.isCollaborator(invokerAddress);
  if (gate.includeCollaborators && isCollaborator) {
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
