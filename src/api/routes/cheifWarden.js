const express = require('express');
const {
    createCheifWarden,
    getCheifWarden,
    updateCheifWarden,
    getCheifWardenArchives,
    createCheifWardenArchives,
    login
} = require('../controllers/cheifWarden');
const { auth } = require("../middlewares/auth")
const student = require("../models/student")
const { messAdmin } = require("../models/mess")
const { hostelSecretary,hostelWarden,careTaker } = require("../models/hostel")
const { hostelAdmin } = require("../models/hostelAdmin")
const { has } = require("../models/has")
const router = express.Router();

//hostel-admin
router.post('/login',login);
router.post('',auth([2,hostelAdmin]),createCheifWarden);
router.post('/update',auth([2,hostelAdmin]),updateCheifWarden);
router.get('',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getCheifWarden);

//archives
router.post('/archives',auth([2,hostelAdmin]),createCheifWardenArchives);
router.get('/archives',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getCheifWardenArchives);
module.exports = router;