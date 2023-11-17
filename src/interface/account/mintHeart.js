const { ozDefender, account } = require("../../domain");
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const mintHeartValidation = {
  body: Joi.object({
    message: Joi.string().required(),
    signature: Joi.string().required(),
    urlString: Joi.string().required(),
    startBlock: Joi.number().required(),
    invokerAddress: Joi.string().required(),
    rawUrl: Joi.string().required(),
  }),
};

async function mintHeart(req, res) {
  const { message, signature, urlString, startBlock, invokerAddress, rawUrl } =
    req.body;
  await account.validateSignature({
    message,
    signature,
    address: invokerAddress,
  });
  const data = await ozDefender.mintHeart({
    invokerAddress,
    urlString,
    chainId,
    startBlock,
    rawUrl,
  });
  const txnHash = JSON.parse(data.result);
  res.json({ txnHash });
}

module.exports = [validate(mintHeartValidation), mintHeart];
