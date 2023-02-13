const mongoose = require('mongoose');
const { Schema } = mongoose;

const _gate = {};

_gate.schema = new Schema({
  gateId: { type: String, required: true },
  invokerAddress: { type: String, lowercase: true },
  contractAddress: {
    type: String,
    lowercase: true,
    required: true,
  },
  params: [{ type: String, required: true }],
  includeCollaborators: { type: Boolean, required: true },
  includeMembers: { type: Boolean, default: false },
  repToken: {
    name: { type: String },
    symbol: { type: String },
    image: { type: String },
  },
  timeStamp: { type: Date, required: true, default: Date.now },
});

_gate.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_gate.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'gateId',
    'invokerAddress',
    'contractAddress',
    'params',
    'includeCollaborators',
    'includeMembers',
    'repToken',
    'timeStamp',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_gate.model = mongoose.model('gates', _gate.schema);

module.exports = _gate;
