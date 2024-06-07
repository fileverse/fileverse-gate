const express = require('express');

const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const codes = require('./codes');
router.use('/codes', codes);


const whitelistAddress = require('./address');
router.post('/address', asyncHandlerArray(whitelistAddress));

module.exports = router;
