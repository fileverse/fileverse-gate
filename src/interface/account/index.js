const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');


const getNftsByAccount = require('./getNftsByAccount');
const getTokensByAccount = require('./getTokensByAccount');
const registerMember = require('./registerMember');

// middlewares
const {
  canViewAccount,
  canRegisterMember,
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

module.exports = router;
