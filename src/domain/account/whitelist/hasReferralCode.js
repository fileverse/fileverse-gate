const WhitelistCodes = require("../../whitelistCodes")

async function hasReferralCode({ code }) {
  if (!code) {
    return false;
  }
  const resp = await WhitelistCodes.isEnalbed({ code });
  return resp;
}

module.exports = hasReferralCode;
