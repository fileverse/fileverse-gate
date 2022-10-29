const express = require('express');
const router = express.Router();

const gate = require('./gate');
const account = require('./account');

router.use('/gate', gate);
router.use('/account', account);

module.exports = router;
