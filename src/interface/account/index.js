const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');


const getNftsByAccount = require('./getNftsByAccount');
const getTokensByAccount = require('./getTokensByAccount');

// middlewares
const {
  canViewAccount,
} = require('../middleware');

router.get(
  '/nfts',
  asyncHandler(canViewAccount),
  asyncHandlerArray(getNftsByAccount),
);

router.get(
  '/tokens',
  asyncHandler(canViewAccount),
  asyncHandlerArray(getTokensByAccount),
);

module.exports = router;
