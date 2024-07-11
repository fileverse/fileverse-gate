const { WhitelistCodes } = require("../../infra/database/models");

async function updateCount({ code }) {
    const whitelistCode = await WhitelistCodes.findOneAndUpdate(
        { code },
        { $inc: { used: 1 } },
        { new: true }
    );

    return whitelistCode;
}

module.exports = updateCount;