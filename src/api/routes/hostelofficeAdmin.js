const express = require('express');
const {
    createHostelOfficeAdmin,
    getHostelOfficeAdmin,
    updateHostelOfficeAdmin,
    getHostelOfficeAdminArchives,
    createHostelOfficeAdminArchives,
    login
} = require('../controllers/hostelOfficeAdmin');
const { auth } = require("../middlewares/auth")
const student = require("../models/student")
const { messAdmin } = require("../models/mess")
const { hostelSecretary,hostelWarden,careTaker } = require("../models/hostel")
const { hostelAdmin } = require("../models/hostelAdmin")
const { has } = require("../models/has")
const router = express.Router();

//hostel-admin
router.post('/login',login);
router.post('',auth([2,hostelAdmin]),createHostelOfficeAdmin);
router.post('/update',auth([2,hostelAdmin]),updateHostelOfficeAdmin);
router.get('',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelOfficeAdmin);

//archives
router.post('/archives',auth([2,hostelAdmin]),createHostelOfficeAdminArchives);
router.get('/archives',auth([7,student,messAdmin,hostelAdmin,hostelWarden,cheifWarden,hostelSecretary]), getHostelOfficeAdminArchives);
