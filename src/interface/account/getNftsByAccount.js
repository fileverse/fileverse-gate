const { account } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const getNftsByAccountValidation = {
  query: Joi.object({
    search: Joi.string().optional(),
    chain: Joi.string().valid('ethereum', 'polygon', 'goerli', 'aurora').optional(),
  }),
};

async function getNftsByAccount(req, res) {
  const { invokerAddress } = req;
  const { search = '', chain } = req.query;
  const nfts = await account.getNfts({ address: invokerAddress, search, chain });
  res.json({ nft: nfts });
}

module.exports = [validate(getNftsByAccountValidation), getNftsByAccount];
