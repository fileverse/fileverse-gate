const { WhitelistCodes } = require("../../infra/database/models");

async function getAll({ status }) {

    const whitelistCodes = WhitelistCodes.find({ status });
    if (status == 'active') {
        whitelistCodes.find({
            $and: [
                { $or: [{ date_begin: null }, { date_begin: { $lte: today } }] },
                { $or: [{ date_end: null }, { date_end: { $gte: tommorow } }] }
            ]
        })
    }

    return await whitelistCodes;
}

module.exports = getAll;