const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');


const getNftsByAccount = require('./getNftsByAccount');
const getTokensByAccount = require('./getTokensByAccount');
const registerMember = require('./registerMember');
const isWhitelistByAccount = require('./isWhitelistByAccount');

// middlewares
const {
  canViewAccount,
  canRegisterMember,
  canCheckWhitelist,
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

router.post(
  '/register',
  asyncHandler(canRegisterMember),
  asyncHandlerArray(registerMember),
);

router.get(
  '/check-whitelist',
  asyncHandler(canCheckWhitelist),
  asyncHandlerArray(isWhitelistByAccount),
);

module.exports = router;
