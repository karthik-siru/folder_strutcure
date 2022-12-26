const express = require('express');
const {
    createHostelManager,
    getHostelManager,
    updateHostelManager,
    getHostelManagerArchives,
    createHostelManagerArchives,
    login
} = require('../controllers/hostelManager');
const { auth } = require("../middlewares/auth")
const student = require("../models/student")
const { messAdmin } = require("../models/mess")
const { hostelSecretary,hostelWarden,careTaker } = require("../models/hostel")
const { hostelAdmin } = require("../models/hostelAdmin")
const { has } = require("../models/has")
const router = express.Router();

//hostel-admin
router.post('/login',login);
router.post('',auth([2,hostelAdmin]),createHostelManager);
router.post('/update',auth([2,hostelAdmin]),updateHostelManager);
router.get('',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelManager);

//archives
router.post('/archives',auth([2,hostelAdmin]),createHostelManagerArchives);
router.get('/archives',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelManagerArchives);
module.exports = router;