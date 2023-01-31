const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');


const getStatus = require('./getStatus');

// middlewares
const {
  canViewContract,
} = require('../middleware');

router.get(
  '/status',
  asyncHandler(canViewContract),
  asyncHandlerArray(getStatus),
);

module.exports = router;
