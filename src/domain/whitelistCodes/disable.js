const { WhitelistCodes } = require("../../infra/database/models");

async function disable({ codes }) {
    const updatedWhitelistCodesData = await WhitelistCodes.findOneAndUpdate(
        { code: { $in: codes } },
        { status: 'inactive' },
        { new: true }
    );
    return updatedWhitelistCodesData;
}

module.exports = disable;