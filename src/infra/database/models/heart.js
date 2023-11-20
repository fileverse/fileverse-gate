const mongoose = require("mongoose");
const { Schema } = mongoose;

const _heart = {};

_heart.schema = new Schema({
  invokerAddress: { type: String, lowercase: true },
  tokenId: { type: Number, required: true },
  urlString: {
    type: String,
    required: true,
  },
  chainId: { type: Number, required: true },
  timeStamp: { type: Date, required: true, default: Date.now },
});

_heart.schema.pre("save", function (next) {
  this.timeStamp = Date.now();
  next();
});

_heart.schema.methods.safeObject = function () {
  const safeFields = [
    "_id",
    "invokerAddress",
    "tokenId",
    "urlString",
    "timeStamp",
    "chainId",
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_heart.model = mongoose.model("hearts", _heart.schema);

module.exports = _heart;
