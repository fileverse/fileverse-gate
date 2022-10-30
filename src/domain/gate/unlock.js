const { Gate } = require('../../infra/database/models');
const KMS = require('../../infra/kms');
const kms = new KMS();

async function unlock({ contractAddress, message, signature, address, gateId }) {
  const gate = await Gate.findOne({ gateId, contractAddress: contractAddress.toLowerCase() }).lean();
  if (!gate) {
    return null;
  }
  const gateKey = await kms.decrypt({ encryptedDataKey: gate.gateId, context: contractAddress.toLowerCase() });
  const dataToReturn = gate;
  dataToReturn.gateKey = gateKey;
  return dataToReturn;
}

module.exports = unlock;
