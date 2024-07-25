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
    const { addressList, isEns, tag, addedBy } = req.body;
    try {
        await Whitelist.create({ addressList, isEns, tag, addedBy });
        res.json({ success: true, error: null });
    }
    catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
}

module.exports = [validate(whiteListAddressValidation), whitelistAddress];