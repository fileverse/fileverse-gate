const express = require('express');

const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../infra/asyncHandler');

const new_codes = require('./newCodes');
const disable_codes = require('./disableCodes');
const allCodes = require('./allCodes');

router.post('/add', asyncHandlerArray(new_codes));
router.post('/disable', asyncHandlerArray(disable_codes));
router.get('/', asyncHandlerArray(allCodes));

module.exports = router;
