const express = require('express');
const router = express.Router();

const gate = require('./gate');
const account = require('./account');
const contract = require('./contract');
const whitelist_codes = require('./whitelistCodes');

router.use('/gate', gate);
router.use('/account', account);
router.use('/contract', contract);
router.use('/whitelist-codes', whitelist_codes);

module.exports = router;
