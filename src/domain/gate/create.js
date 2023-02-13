const { Gate } = require('../../infra/database/models');
const KMS = require('../../infra/kms');
const kms = new KMS();

async function create({ contractAddress, invokerAddress, params, includeCollaborators, includeMembers, repToken }) {
  const gateKeyPair = await kms.generateDataKey({ context: contractAddress.toLowerCase() });
  const createdGate = await new Gate({
    gateId: gateKeyPair.CiphertextBlob,
    contractAddress,
    invokerAddress,
    params,
    includeCollaborators,
    includeMembers,
    repToken,
  }).save();
  const dataToReturn = createdGate.toObject();
  dataToReturn.gateKey = gateKeyPair.Plaintext;
  return dataToReturn;
}

module.exports = create;
