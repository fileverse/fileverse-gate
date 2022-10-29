const ErrorHandler = require('../../infra/errorHandler');

async function canViewAccount(req, res, next) {
  const invokerAddress = req.invokerAddress;
  const contractAddress = req.contractAddress;
  if (req.isAuthenticated) {
    next();
  } else {
    let statusCode = 403;
    if (!invokerAddress) {
      statusCode = 401;
    }
    return ErrorHandler.throwError({
      code: statusCode,
      message: `${invokerAddress} does not have permission to view user account for subdomain ${contractAddress}`,
      req,
    });
  }
}

module.exports = canViewAccount;
