const { hasDeployedPortal, hasReferralCode } = require('./whitelist');
const { Whitelist } = require('../../infra/database/models');

async function isWhitelisted({ invokerAddress, code = null }) {
  // check if address has ever deployed a portal
  const hasDeployed = await hasDeployedPortal({ invokerAddress });
  if (hasDeployed) {
    return true;
  }
  const hasReferral = await hasReferralCode({ code });
  if (hasReferral) {
    return true;
  }
  const whitelist = await Whitelist.findOne({ invokerAddress: invokerAddress.toLowerCase() });
  return whitelist ? true : false;
}

module.exports = isWhitelisted;
