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
        const whitelistCodes = await WhitelistCodes.getAllByStatus({ status });
        let resp = whitelistCodes.map((code) => {
            return {
                code: code.code,
                description: code.description,
            }
        });
        res.json({ status: status, data: resp });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = [validate(get_all_req_validations), allCodes];