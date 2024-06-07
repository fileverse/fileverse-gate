const Whitelist = require('../../domain/whitelist');

async function getAddress(req, res) {
    const { address } = req.params;
    try {
        const whitelist = await Whitelist.find({ address });
        if (!whitelist) {
            throw new Error(`Address ${address} not found`);
        }
        res.json({
            success: true,
            error: null,
            invokerAddress: whitelist.invokerAddress,
            tag: whitelist.tag,
            timeStamp: whitelist.timeStamp,
            author: whitelist.author,
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = getAddress;