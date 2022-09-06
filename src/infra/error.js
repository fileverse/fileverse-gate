const { ValidationError } = require('./../interface/middleware/validator');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, token: err.token });
  }
  return res
    .status(err.code || 500)
    .json({ message: err.message, token: err.token });
}

module.exports = { expressHandler };
