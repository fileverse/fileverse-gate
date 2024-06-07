const WhitelistCodes = require("../../../domain/whitelistCodes");
const { validator } = require("../../middleware");
const { Joi, validate } = validator;

const disable_codes_req_validations = {
    body: Joi.object({
        codes: Joi.array().items(
            Joi.string().required()
        ).required(),
    }),
};

async function disable_codes(req, res) {
    const { codes } = req.body;
    try {
        const updatedWhitelistCodesData = await WhitelistCodes.disable({ codes })
        res.json(updatedWhitelistCodesData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = [validate(disable_codes_req_validations), disable_codes];