const { ethers } = require('ethers');
const ErrorHandler = require('../../infra/errorHandler');

async function verifySignature({ address, message, signature }) {
  const adr = await ethers.utils.verifyMessage(message, signature);
  return adr.toLowerCase() === address.toLowerCase();
}

async function validateSignature({
  address,
  message,
  signature,
}) {
  const isSignatureValid = await verifySignature({
    address,
    message,
    signature,
  });
  if (!isSignatureValid) {
    return ErrorHandler.throwError({
      code: 400,
      message: `Signature is not valid for address: ${address}`,
    });
  }
  return isSignatureValid;
}

module.exports = validateSignature;
