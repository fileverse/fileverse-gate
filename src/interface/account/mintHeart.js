const { ozDefender, account } = require("../../domain");
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const mintHeartValidation = {
  body: Joi.object({
    invokerAddress: Joi.string().required(),
    urlString: Joi.string().required(),
  }),
};

async function mintHeart(req, res) {
  const { invokerAddress, contractAddress, chainId } = req;
  const { message, signature } = req.body;
  await account.validateSignature({
    message,
    signature,
    address: invokerAddress,
  });
  const data = await ozDefender.mintHeart({
    invokerAddress,
    contractAddress,
    chainId,
  });
  const txnHash = JSON.parse(data.result);
  res.json({ txnHash });
}

module.exports = [validate(mintHeartValidation), mintHeart];
