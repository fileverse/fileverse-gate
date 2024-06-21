const { account } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const getNftsByAccountValidation = {
  query: Joi.object({
    search: Joi.string().optional(),
    tokenAddress: Joi.string().optional(),
    tokenId: Joi.string().optional(),
    chain: Joi.string().valid('ethereum', 'polygon', 'goerli', 'aurora').optional(),
  }),
};

async function getNftsByAccount(req, res) {
  const { invokerAddress } = req;
  const { search = '', chain, tokenAddress, tokenId } = req.query;
  const token = {
    address: tokenAddress,
    id: tokenId,
  }

  const nfts = await account.getNfts({ address: invokerAddress, search, chain, token });
  res.json({ nft: nfts });
}

module.exports = [validate(getNftsByAccountValidation), getNftsByAccount];
