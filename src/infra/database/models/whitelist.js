const mongoose = require('mongoose');
const { Schema } = mongoose;

const _whitelist = {};

_whitelist.schema = new Schema({
  invokerAddress: { type: String, lowercase: true },
  contractAddress: {
    type: String,
    lowercase: true,
    required: true,
  },
  tags: [{ type: Number }],
  timeStamp: { type: Date, required: true, default: Date.now },
});

_whitelist.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_whitelist.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'invokerAddress',
    'contractAddress',
    'tags',
    'timeStamp',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_whitelist.model = mongoose.model('whitelists', _whitelist.schema);

module.exports = _whitelist;
