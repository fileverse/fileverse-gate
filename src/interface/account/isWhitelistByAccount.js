const { account } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const isWhitelistByAccountValidation = {
  headers: Joi.object({
    invoker: Joi.string().required(),
  }).unknown(true),
  query: Joi.object({
    code: Joi.string().optional(),
  }).unknown(true),
};

async function isWhitelistByAccount(req, res) {
  const { invokerAddress } = req;
  const { code } = req.query;
  const whitelist = await account.isWhitelisted({
    invokerAddress,
    code,
  });
  res.json({ invokerAddress, whitelisted: !!whitelist });
}

module.exports = [
  validate(isWhitelistByAccountValidation),
  isWhitelistByAccount,
];
