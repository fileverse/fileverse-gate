const { account } = require('../../domain');
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const isWhitelistByAccountValidation = {
  headers: Joi.object({
    invoker: Joi.string().required(),
  }).unknown(true),
};

async function isWhitelistByAccount(req, res) {
  const { invokerAddress } = req;
  const whitelist = await account.isWhitelisted({ invokerAddress });
  res.json({ invokerAddress, whitelisted: !!whitelist });
}

module.exports = [validate(isWhitelistByAccountValidation), isWhitelistByAccount];
