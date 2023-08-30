const {
  hasDeployedPortal,
  hasReferralCode,
  isSafeAddress,
} = require('./whitelist');
const { Whitelist } = require('../../infra/database/models');

async function isWhitelisted({ invokerAddress, code = null, chainId }) {
  // check if address has ever deployed a portal
  const hasDeployed = await hasDeployedPortal({ invokerAddress });
  if (hasDeployed) {
    return true;
  }
  const hasReferral = await hasReferralCode({ code });
  if (hasReferral) {
    return true;
  }
  const isInvokerAddressSafe = await isSafeAddress({
    address: invokerAddress,
    chainId,
  });

  if (isInvokerAddressSafe) {
    return true;
  }

  const whitelist = await Whitelist.findOne({
    invokerAddress: invokerAddress.toLowerCase(),
  });
  return whitelist ? true : false;
}

module.exports = isWhitelisted;
