const mongoose = require('mongoose');
const { Schema } = mongoose;

const _whitelist = {};

_whitelist.schema = new Schema({
  invokerAddress: {
    type: String,
    lowercase: true,
    index: true,
  },
  tag: { type: String },
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now
  },
});

_whitelist.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_whitelist.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'invokerAddress',
    'tag',
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
