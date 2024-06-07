const mongoose = require('mongoose');
const { Schema } = mongoose;

const _whitelist_codes = {};



_whitelist_codes.schema = new Schema({
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'expired'], // Optional: to restrict the values for status
    default: 'active'
  },
  expiry: {
    type: Date,
    required: false
  },
  allowedUses: {
    type: Number,
    required: false,
  },
  used: {
    type: Number,
    required: true,
    default: 0
  }
});

_whitelist_codes.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_whitelist_codes.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'code',
    'description',
    'expiry',
    'status',
    'timeStamp',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_whitelist_codes.model = mongoose.model('whitelist_codes', _whitelist_codes.schema);

module.exports = _whitelist_codes;
