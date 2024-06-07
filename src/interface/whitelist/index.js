const express = require('express');

const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const { whitelistAdmin } = require('../middleware');

const codes = require('./codes');
router.use('/codes', codes);

const getAddress = require('./getAddress');
const whitelistAddress = require('./address');

router.post('/address', asyncHandler(whitelistAdmin), asyncHandlerArray(whitelistAddress));
router.get('/address/:address', asyncHandler(getAddress));

module.exports = router;
