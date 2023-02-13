const { gate } = require("../../domain");
const { validator } = require("../middleware");
const { Joi, validate } = validator;

const createGateValidation = {
  body: Joi.object({
    params: Joi.array().items(Joi.string().required()).required(),
    includeCollaborators: Joi.boolean().default(false),
    repToken: Joi.object({
      name: Joi.string(),
      symbol: Joi.string(),
      image: Joi.string(),
    }).optional(),
  }),
};

async function createGate(req, res) {
  const { contractAddress, invokerAddress } = req;
  const { params, includeCollaborators } = req.body;
  const createdGateData = await gate.create({ contractAddress, invokerAddress, params, includeCollaborators });
  res.json(createdGateData);
}

module.exports = [validate(createGateValidation), createGate];
