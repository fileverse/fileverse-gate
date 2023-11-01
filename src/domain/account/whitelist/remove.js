const _errorHandler = require('../../../infra/errorHandler');
const { Whitelist } = require('./../../../infra/database/models');

async function remove(address) {
  const whitelist = await Whitelist.findOne({
    invokerAddress: address.toLowerCase(),
  });
  if (!whitelist) {
    return _errorHandler.throwError({
      code: 404,
      message: 'address not found',
    });
  }
  await whitelist.delete();
  return true;
}

module.exports = remove;
