const { account } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const getTokensByAccountValidation = {
  query: Joi.object({
    search: Joi.string().optional(),
    tokenAddress: Joi.string().optional(),
    chain: Joi.string().valid('ethereum', 'polygon', 'goerli', 'aurora').optional(),
  }),
};

async function getTokensByAccount(req, res) {
  const { invokerAddress } = req;
  const { search = '', chain, tokenAddress } = req.query;

  const tokens = await account.getTokens({ address: invokerAddress, search, chain, tokenAddress });
  res.json({ token: tokens });
}

module.exports = [validate(getTokensByAccountValidation), getTokensByAccount];