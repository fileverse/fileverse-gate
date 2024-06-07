const Whitelist = require('../../domain/whitelist');
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const whiteListAddressValidation = {
    body: Joi.object({
        address: Joi.array().items(
            Joi.string().required(),
        ).required(),
        tag: Joi.string().optional(),
    }),
};


async function whitelistAddress(req, res) {
    const { address, tag } = req.body;
    try {
        await Whitelist.create({ address, tag });
        res.json({ success: true, error: null });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = [validate(whiteListAddressValidation), whitelistAddress];