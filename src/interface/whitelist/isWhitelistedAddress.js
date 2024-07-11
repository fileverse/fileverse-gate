const Whitelist = require('../../domain/whitelist');

async function isWhitelistedAddress(req, res) {
    const { address } = req.params;
    try {
        const whitelist = await Whitelist.find({ address });
        if (!whitelist) {
            return res.json({
                isWhitelisted: false, invokerAddress: address
            });
        }
        res.json({
            isWhitelisted: true,
            tag: whitelist.tag,
            addedBy: whitelist.addedBy,
            invokerAddress: whitelist.invokerAddress,
        });
    }
    catch (error) {
        return res.status(400).json({ IsWhitelisted: false, error: error.message });
    }
}

module.exports = isWhitelistedAddress;