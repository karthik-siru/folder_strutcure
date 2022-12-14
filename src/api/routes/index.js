const express = require('express');
const authRoute = require('./AuthRoute');
const messRoute = require('./MessRoute')
const router = express.Router();

router.use('/auth',authRoute)
router.use('/mess',messRoute)

module.exports =  router;