const ethers = require("ethers");
const Provider = require('../../contract/providerInstance');
const providerInstance = new Provider();

async function isSafeAddress(address) {
  try {
    address = ethers.utils.getAddress(address);
    const isContract = await providerInstance.isContract(address);
    return isContract;
  } catch (e) {
    return false;
  }
}

module.exports = isSafeAddress;
