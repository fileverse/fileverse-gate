async function updateCount({ code }) {
    const whitelistCode = await WhitelistCodes.findOne({ code });
    whitelistCode.used += 1;
    await whitelistCode.save();
    return whitelistCode;
}

module.exports = updateCount;