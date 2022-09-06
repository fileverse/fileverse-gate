const KMS = require('../../infra/kms');
const kms = new KMS();

async function create({ contractAddress }) {
  const createKey = await kms.generateDataKey({ context: contractAddress.toLowerCase() });
  // full file
  return {
    plaintextKey: createKey.Plaintext,
    gateKey: createKey.CiphertextBlob,
    contractAddress,
  };
}

module.exports = create;
