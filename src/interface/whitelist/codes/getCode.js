const WhitelistCodes = require("../../../domain/whitelistCodes");

async function getCode(req, res) {
    const { code } = req.params;
    try {
        const whitelistCodes = await WhitelistCodes.getByCode({ code });
        if (whitelistCodes == null) {
            return res.json({ message: "Not found", code: code })
        }
        res.json({
            data: {
                code: whitelistCodes.code,
                description: whitelistCodes.description,
                expiry: whitelistCodes.expiry,
                allowedUses: whitelistCodes.allowedUses,
                used: whitelistCodes.used,
            },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = getCode;