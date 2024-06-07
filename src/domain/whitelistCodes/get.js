const { WhitelistCodes } = require("../../infra/database/models");

async function getAll({ status }) {

    const whitelistCodes = WhitelistCodes.find({ status });
    if (status == 'active') {
        whitelistCodes.find({
            $and: [
                {
                    $or: [
                        { expiry: null },
                        { expiry: { $lt: Date.now() } }
                    ]
                },
                {
                    $or: [
                        { allowedUses: null },
                        { $expr: { $gt: ['$allowedUses', '$used'] } }
                    ]
                }
            ]
        })
    }

    return await whitelistCodes;
}

module.exports = getAll;