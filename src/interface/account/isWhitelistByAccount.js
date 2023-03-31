const { validator } = require("../middleware");
const { Joi, validate } = validator;

const isWhitelistByAccountValidation = {
  headers: Joi.object({
    invoker: Joi.string().required(),
  }).unknown(true),
};

async function isWhitelistByAccount(req, res) {
  const { invokerAddress } = req;
  res.json({ invokerAddress, whitelisted: false });
}

module.exports = [validate(isWhitelistByAccountValidation), isWhitelistByAccount];
