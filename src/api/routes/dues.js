const express = require('express');
const {
    getDues,
    getDuesByPartialRollno,
    getDuesByRollno,
    updateDues,
    updateDuesByRollno
} = require('../controllers/dues');
const { auth } = require("../middlewares/auth")
const student = require("../models/student")
const { messAdmin } = require("../models/mess")
const { hostelSecretary,hostelWarden,careTaker } = require("../models/hostel")
const { hostelAdmin } = require("../models/hostelAdmin")
const { has } = require("../models/has")
const router = express.Router();


router.post('',auth([2,hostelAdmin]),updateDues);
router.post('/rollno',auth([2,hostelAdmin]),updateDuesByRollno);
router.get('',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getDues);
router.get('/:rollno',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getDuesByRollno);
router.get('/partial/:rollno',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getDuesByPartialRollno);

module.exports = router;