const WhitelistCodes = require("../../whitelistCodes")

async function hasReferralCode({ code }) {
  if (!code) {
    return false;
  }
  const resp = await WhitelistCodes.isEnalbed({ code });

  if (resp == false) {
    return false;
  }

  try {
    _ = await WhitelistCodes.updateCount({ code });
  } catch (e) {
    console.error("failed to update the count of code", code, "due to ", e);
  }
  return true;

}

module.exports = hasReferralCode;
