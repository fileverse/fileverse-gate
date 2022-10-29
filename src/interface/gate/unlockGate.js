const { gate } = require("../../domain");
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const unlockGateValidation = {
  body: Joi.object({
    message: Joi.string().required(),
    signature: Joi.string().required(),
    address: Joi.string().required(),
    gateId: Joi.string().required(),
  }),
};

async function unlockGate(req, res) {
  const { contractAddress, invokerAddress } = req;
  const { message, signature, address, gateId } = req.body;
  const unlockedGateData = await gate.unlock({ contractAddress, invokerAddress, message, signature, address, gateId });
  res.json(unlockedGateData);
}

module.exports = [validate(unlockGateValidation), unlockGate];
