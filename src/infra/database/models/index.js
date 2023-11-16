require("../");

const _models = {
  Member: require("./member").model,
  Gate: require("./gate").model,
  Whitelist: require("./whitelist").model,
  Heart: require("./heart").model,
};

module.exports = _models;
