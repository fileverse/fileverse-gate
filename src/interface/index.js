const express = require('express');
const router = express.Router();

const gate = require('./gate');

router.use('/gate', gate);

module.exports = router;
