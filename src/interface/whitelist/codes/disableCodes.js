const WhitelistCodes = require("../../../domain/whitelistCodes");
const { validator } = require("../../middleware");
const { Joi, validate } = validator;

const disableCodesReqValidations = {
    body: Joi.object({
        codes: Joi.array().items(
            Joi.string().required()
        ).required(),
    }),
};

async function disableCodes(req, res) {
    const { codes } = req.body;
    try {
        const updatedWhitelistCodesData = await WhitelistCodes.disable({ codes });
        updatedCodes = updatedWhitelistCodesData.map((code) => {
            return code.code;
        });
        res.json({ success: true, codes: updatedCodes });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = [validate(disableCodesReqValidations), disableCodes];