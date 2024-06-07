const express = require('express');

const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const whitelistAddress = require('./address');
const getAddress = require('./getAddress');
const { whitelistAdmin } = require('../middleware');

router.post('/address', asyncHandler(whitelistAdmin), asyncHandlerArray(whitelistAddress));
router.get('/address/:address', asyncHandler(getAddress));

module.exports = router;
