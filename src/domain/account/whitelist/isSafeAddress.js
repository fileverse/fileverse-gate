const axios = require('axios');
const { errorHandler } = require('../../../interface/middleware');
const _errorHandler = require('../../../infra/errorHandler');

async function isSafeAddress(address) {
  try {
    const response = await axios({
      method: 'get',
      url: `https://safe-transaction-mainnet.safe.global/api/v1/safes/${address}`,
    });
    if (response && response.data) return true;
    return false;
  } catch (e) {
    if (e.response.status !== 404)
      return _errorHandler.throwError({
        code: 500,
        message: 'Interval Server Error',
      });
    return false;
  }
}

module.exports = isSafeAddress;
