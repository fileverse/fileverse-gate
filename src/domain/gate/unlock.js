const { Gate } = require('../../infra/database/models');
const KMS = require('../../infra/kms');
const kms = new KMS();

async function unlock({ contractAddress, invokerAddress, message, signature, address, gateId }) {
  const gate = await Gate.findOne({ gateId, contractAddress, invokerAddress }).lean();
  if (!gate) {
    return null;
  }
  const gateKeyPair = await kms.decrypt({ encryptedDataKey: gate.gateId, context: contractAddress.toLowerCase() });
  const dataToReturn = gate;
  dataToReturn.gateKey = gateKeyPair.Plaintext;
  return dataToReturn;
}

module.exports = unlock;
