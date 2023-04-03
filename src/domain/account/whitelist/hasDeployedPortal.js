const { RegistryContract } = require('../../contract');
const registryInstance = new RegistryContract();

async function hasDeployedPortal({ invokerAddress }) {
  const hasDeployedPortal = await registryInstance.hasDeployedPortal(invokerAddress);
  return hasDeployedPortal;
}

module.exports = hasDeployedPortal;
