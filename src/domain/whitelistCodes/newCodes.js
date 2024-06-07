const { WhitelistCodes } = require("../../infra/database/models");

async function add({ code, description, expiry, status, allowedUses, timeStamp }) {
    const isExistingCode = await WhitelistCodes.findOne({ code });
    if (isExistingCode) {
        throw new Error('Code already exists');
    }

    const createdWhitelistCodesData = await WhitelistCodes.create({
        code,
        description,
        expiry: expiry ? new Date(expiry) : null,
        status,
        allowedUses: allowedUses || null,
        timeStamp,
    });

    return createdWhitelistCodesData;
}

module.exports = add;