const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');


const getStatus = require('./getStatus');
const getMembers = require('./getMembers');

// middlewares
const {
  canViewContract,
} = require('../middleware');

router.get(
  '/status',
  asyncHandler(canViewContract),
  asyncHandlerArray(getStatus),
);

router.get(
  '/members',
  asyncHandler(canViewContract),
  asyncHandlerArray(getMembers),
);

module.exports = router;
