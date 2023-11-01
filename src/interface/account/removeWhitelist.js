const Whitelist = require('../../domain/account/whitelist');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const removeWhitelistValidation = {
  query: Joi.object({
    address: Joi.string().required(),
  }),
};

async function createWhitelist(req, res) {
  const { address } = req.query;
  const isRemoved = await Whitelist.remove(address);
  res.json({ isRemoved });
}

module.exports = [validate(removeWhitelistValidation), createWhitelist];
