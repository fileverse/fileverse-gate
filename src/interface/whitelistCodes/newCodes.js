const WhitelistCodes = require("../../domain/whitelistCodes");
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const new_codes_req_validation = {
    body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        expiry: Joi.date().optional(),
        allowedUses: Joi.number().optional(),
    }),
};

async function new_codes(req, res) {
    const { code, description, expiry, allowedUses, timeStamp } = req.body;

    try {
        const createdWhitelistCodesData = await WhitelistCodes.add({
            code, description, expiry, allowedUses, timeStamp
        });
        res.json(createdWhitelistCodesData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = [validate(new_codes_req_validation), new_codes];