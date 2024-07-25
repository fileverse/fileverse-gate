const Whitelist = require('../../domain/whitelist');
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const whiteListAddressValidation = {
    body: Joi.object({
        addressList: Joi.array().items(
            Joi.string().required(),
        ).required(),
        tag: Joi.string().optional(),
        addedBy: Joi.string().required(),
    }),
};


async function whitelistAddress(req, res) {
    const { addressList, tag, addedBy } = req.body;
    try {
        const { validAddress, invalidAddress } = await Whitelist.create({ addressList, tag, addedBy });
        res.json({ success: true, validAddress, invalidAddress });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = [validate(whiteListAddressValidation), whitelistAddress];