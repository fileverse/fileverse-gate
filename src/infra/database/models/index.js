require('../');

const _models = {
  Member: require('./member').model,
  Gate: require('./gate').model,
  Whitelist: require('./whitelist').model,
};

module.exports = _models;
