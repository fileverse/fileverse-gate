const codes = require("./codes.json");

async function hasReferralCode({ code }) {
  if (!code) {
    return false;
  }
  const found = codes.find(
    (elem) => elem.code.toLowerCase() === code.toLowerCase()
  );
  return !!found;
}

module.exports = hasReferralCode;
