const { gate } = require("../../domain");
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const unlockGateValidation = {
  body: Joi.object({
    message: Joi.string().required(),
    signature: Joi.string().required(),
    gateId: Joi.string().required(),
  }),
};

async function unlockGate(req, res) {
  const { contractAddress, invokerAddress } = req;
  const { message, signature, gateId } = req.body;
  if (!req.isAuthenticated) {
    await validateSignature({
      message,
      signature,
      address: invokerAddress,
    });
  }
  const unlockedGateData = await gate.unlock({
    contractAddress,
    invokerAddress,
    gateId,
  });
  res.json(unlockedGateData);
}

module.exports = [validate(unlockGateValidation), unlockGate];
