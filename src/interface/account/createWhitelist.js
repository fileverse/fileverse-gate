const Whitelist = require('../../domain/account/whitelist');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const createWhitelistValidation = {
  body: Joi.object({
    address: Joi.string().required(),
    tag: Joi.string().invalid('admin').optional(),
  }),
};

async function createWhitelist(req, res) {
  const { address, tag } = req.body;
  const isWhitelisted = await Whitelist.create({ address, tag });
  res.json({ isWhitelisted });
}

module.exports = [validate(createWhitelistValidation), createWhitelist];
