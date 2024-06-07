const express = require('express');

const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const whitelistAddress = require('./address');

router.post('/address', asyncHandlerArray(whitelistAddress));

module.exports = router;
