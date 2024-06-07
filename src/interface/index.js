const express = require('express');
const router = express.Router();

const gate = require('./gate');
const account = require('./account');
const contract = require('./contract');
const whitelist = require('./whitelist');

router.use('/gate', gate);
router.use('/account', account);
router.use('/contract', contract);
router.use('/whitelist', whitelist);

module.exports = router;
