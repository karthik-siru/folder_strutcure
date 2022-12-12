const express = require('express');
const authRoute = require('./AuthRoute');
const router = express.Router();

router.use('/auth', authRoute)


module.exports =  router;