const { gate } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const unlockGateValidation = {
    headers: Joi.object({
      contract: Joi.string().required(),
    }).unknown(true),
    query: Joi.object({
      gateKey: Joi.string().required(),
    }),
};

async function unlockGate(req, res) {
  const { contract } = req.headers;
  const { gateKey } = req.query;
  const unlockedGate = await gate.unlock({
    gateKey,
    contractAddress: contract,
  });
  res.json(unlockedGate);
}

module.exports = [validate(unlockGateValidation), unlockGate];
