const express = require('express');

const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const whitelistAddress = require('./address');
const IsWhitelistedAddress = require('./isWhitelistedAddress');
const { whitelistAdmin } = require('../middleware');

router.post('/address', asyncHandler(whitelistAdmin), asyncHandlerArray(whitelistAddress));
router.get('/address/:address', asyncHandler(IsWhitelistedAddress));

module.exports = router;
