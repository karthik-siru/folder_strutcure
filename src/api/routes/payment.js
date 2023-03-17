const express = require('express');
const {
    getPayment,
    getPaymentById,
    getPaymentByRollno,
    updatePayment,
    updatePaymentById
} = require('../controllers/payment');
const { auth } = require("../middlewares/auth")
const student = require("../models/student")
const { messAdmin } = require("../models/mess")
const { hostelSecretary,hostelWarden,careTaker } = require("../models/hostel")
const { hostelAdmin } = require("../models/hostelAdmin")
const { has } = require("../models/has")
const router = express.Router();


router.post('',auth([2,hostelAdmin]),updatePayment);
router.post('/id',auth([2,hostelAdmin]),updatePaymentById);
router.get('',auth([4,hostelAdmin,hostelWarden,careTaker]), getPayment);
router.get('/:id',auth([5,student,hostelAdmin,hostelWarden,careTaker]), getPaymentById);
router.get('/:rollno',auth([4,hostelAdmin,hostelWarden,careTaker]), getPaymentByRollno);

module.exports = router;