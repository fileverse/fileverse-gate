const { Whitelist } = require('../../infra/database/models');
const _errorHandler = require('../../infra/errorHandler');

async function canWhitelistOthers(req, res, next) {
  const { invokerAddress } = req;
  if (!req.isAuthenticated) {
    let statusCode = 403;
    if (!invokerAddress) statusCode = 401;
    return _errorHandler.throwError({
      code: statusCode,
      message: `${invokerAddress} cannot whitelist others.`,
    });
  }
  const account = await Whitelist.findOne({
    invokerAddress: invokerAddress.toLowerCase(),
  });
  if (!account || account.tag !== 'admin') {
    return _errorHandler.throwError({
      code: 403,
      message: `${invokerAddress} cannot whitelist others.`,
    });
  }
  next();
}

module.exports = canWhitelistOthers;
