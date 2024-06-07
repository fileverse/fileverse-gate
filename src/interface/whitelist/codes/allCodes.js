const WhitelistCodes = require("../../../domain/whitelistCodes");
const { validator } = require("../../middleware");
const { Joi, validate } = validator;

const get_all_req_validations = {
    query: Joi.object({
        status: Joi.string().required(),
    }),
};


async function allCodes(req, res) {
    const { status } = req.query;
    try {
        const whitelistCodes = await WhitelistCodes.getAll({ status });
        let resp = whitelistCodes.map((code) => {
            return {
                code: code.code,
                description: code.description,
            }
        });
        res.json({ success: true, error: null, status: status, data: resp });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = [validate(get_all_req_validations), allCodes];