const express = require('express');
const {
    createHas,
    getHas,
    updateHas,
    getHasArchives,
    createHasArchives,
    login
} = require('../controllers/has');
const { auth } = require("../middlewares/auth")
const student = require("../models/student")
const { messAdmin } = require("../models/mess")
const { hostelSecretary,hostelWarden,careTaker } = require("../models/hostel")
const { hostelAdmin } = require("../models/hostelAdmin")
const { has } = require("../models")
const router = express.Router();

//hostel-admin
router.post('/login',login);
router.post('',auth([2,hostelAdmin]),createHas);
router.post('/update',auth([2,hostelAdmin]),updateHas);
router.get('',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHas);

//archives
router.post('/archives',auth([2,hostelAdmin]),createHasArchives);
router.get('/archives',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHasArchives);
module.exports = router;