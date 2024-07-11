const { WhitelistCodes } = require("../../infra/database/models");

async function isEnalbed({ code }) {
    const whitelistCode = await WhitelistCodes.findOne({ code });

    if (whitelistCode.status != 'active') {
        return false;
    } else if (whitelistCode.expiry && whitelistCode.expiry < new Date()) {
        return false;
    } else if (whitelistCode.allowedUses && whitelistCode.allowedUses <= whitelistCode.used) {
        return false;
    } else {
        return true;
    }
}

module.exports = isEnalbed;