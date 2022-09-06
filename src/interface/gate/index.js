const express = require('express');

const router = express.Router();

const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../infra/asyncHandler');


const createGate = require('./createGate');
const unlockGate = require('./unlockGate');

// middlewares
const {
  canCreateGate,
  canUnlockGate,
} = require('../middleware');

router.post(
  '/create',
  asyncHandler(canCreateGate),
  asyncHandlerArray(createGate),
);

router.post(
  '/unlock',
  asyncHandler(canUnlockGate),
  asyncHandlerArray(unlockGate),
);

module.exports = router;
