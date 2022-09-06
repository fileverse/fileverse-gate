const { gate } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const createGateValidation = {
    headers: Joi.object({
      contract: Joi.string().required(),
    }).unknown(true),
};

async function createGate(req, res) {
  const { contract } = req.headers;
  const createdGate = await gate.create({
    contractAddress: contract,
  });
  res.json(createdGate);
}

module.exports = [validate(createGateValidation), createGate];
