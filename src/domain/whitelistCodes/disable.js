const { WhitelistCodes } = require("../../infra/database/models");

async function disable({ codes }) {
    const updatedWhitelistCodesData = await WhitelistCodes.Character.findOneAndUpdate(
        { code: { $in: codes } },
        { status: 'inactive' },
        { new: true }
    );
    return updatedWhitelistCodesData;
}

module.exports = disable;