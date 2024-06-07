const express = require('express');

const router = express.Router();

const {
    asyncHandler,
    asyncHandlerArray,
} = require('../../../infra/asyncHandler');

const codeRouter = require('./codes');
const addressRouter = require('./address');

router.use('/codes', codeRouter);
router.use('/address', addressRouter);

module.exports = router;
