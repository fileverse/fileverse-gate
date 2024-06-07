const express = require('express');

const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../../infra/asyncHandler');

const { whitelistAdmin } = require('../../middleware');

const codes = require('../codes');
router.use('/codes', codes);

const getAddress = require('./getAddress');
const whitelistAddress = require('./address');

router.get('/:address', asyncHandler(getAddress));
router.post('/', asyncHandler(whitelistAdmin), asyncHandlerArray(whitelistAddress));

module.exports = router;
