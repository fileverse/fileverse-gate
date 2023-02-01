const { ozDefender, account } = require('../../domain');
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const registerMemberValidation = {
  body: Joi.object({
    message: Joi.string().required(),
    signature: Joi.string().required(),
  }),
};

async function registerMember(req, res) {
  const { invokerAddress, contractAddress, chainId } = req;
  const { message, signature } = req.body;
  await account.validateSignature({
    message,
    signature,
    address: invokerAddress,
  });
  const data = await ozDefender.registerMember({ invokerAddress, contractAddress, chainId });
  const txnHash = JSON.parse(data.result);
  res.json({ txnHash });
}

module.exports = [validate(registerMemberValidation), registerMember];
