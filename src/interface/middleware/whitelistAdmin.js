const ErrorHandler = require('../../infra/errorHandler');
const config = require('../../../config');

const whitelistAdminApiKey = config.WHITELIST_ADMIN_API_KEY;

async function whitelistAdmin(req, res, next) {
  const xApiKey = req.headers['x-api-key'];
  if (!xApiKey || !whitelistAdminApiKey || xApiKey !== whitelistAdminApiKey) {
    return ErrorHandler.throwError({
      code: 401,
      message: 'Unauthorized',
      req,
    });
  }

  next();
}

module.exports = whitelistAdmin;
