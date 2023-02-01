const mongoose = require('mongoose');
const { Schema } = mongoose;

const _member = {};

_member.schema = new Schema({
  invokerAddress: { type: String, lowercase: true },
  contractAddress: {
    type: String,
    lowercase: true,
    required: true,
  },
  tokenId: { type: Number, required: true },
  memberContractAddress: {
    type: String,
    lowercase: true,
    required: true,
  },
  timeStamp: { type: Date, required: true, default: Date.now },
});

_member.schema.pre('save', function (next) {
  this.timeStamp = Date.now();
  next();
});

_member.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'invokerAddress',
    'contractAddress',
    'tokenId',
    'memberContractAddress',
    'timeStamp',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_member.model = mongoose.model('members', _member.schema);

module.exports = _member;
