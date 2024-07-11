const Whitelist = require('../../domain/whitelist');

async function IsWhitelistedAddress(req, res) {
    const { address } = req.params;
    try {
        const whitelist = await Whitelist.find({ address });
        if (!whitelist) {
            return res.json({
                isWhitelisted: false, error: 'No whitelist found for this address'
            });
        }
        res.json({
            isWhitelisted: true,
            invokerAddress: whitelist.invokerAddress,
            tag: whitelist.tag,
            timeStamp: whitelist.timeStamp,
            author: whitelist.author,
            error: null,
        });
    }
    catch (error) {
        return res.status(400).json({ IsWhitelisted: false, error: error.message });
    }
}

module.exports = IsWhitelistedAddress;