const KMS = require('../../infra/kms');
const kms = new KMS();

async function unlock({ contractAddress, gateKey }) {
  const createKey = await kms.decrypt({ encryptedDataKey: gateKey, context: contractAddress.toLowerCase() });
  // full file
  return {
    plaintextKey: createKey.Plaintext,
    gateKey: createKey.CiphertextBlob,
    contractAddress,
  };
}

module.exports = unlock;
