const express = require('express');

const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../../infra/asyncHandler');

const new_codes = require('./newCodes');
const disable_codes = require('./disableCodes');
const allCodes = require('./allCodes');

const { whitelistAdmin } = require('../../middleware');

router.post('/add', asyncHandler(whitelistAdmin), asyncHandlerArray(new_codes));
router.post('/disable', asyncHandler(whitelistAdmin), asyncHandlerArray(disable_codes));
router.get('/', asyncHandler(whitelistAdmin), asyncHandlerArray(allCodes));

module.exports = router;
