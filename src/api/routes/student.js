const express = require("express");
const router = express.Router();

// middleware
const { getStudentById } = require("../middlewares/student");
//controllers
const {
  registerStudent,
  forgotPassword,
  changePassword,
  getStudentByPartialName,
  getStudentByRollno,
  Login,
  getAllStudents,
} = require("../controllers/student");
const student = require("../models/student");
const { messAdmin } = require("../models/mess");
const {
  hostelSecretary,
  hostelWarden,
  careTaker,
} = require("../models/hostel");
const { hostelAdmin } = require("../models/hostelAdmin");
const { has } = require("../models/has");
const { auth } = require("../middlewares/auth");
//params
router.param("rollno", getStudentById);

// routes
router.post("/login", Login);

router.post("/register", auth([2,hostelAdmin]),registerStudent);
router.get("/forgot-password/:rollno", forgotPassword);
router.post("/change-password/:rollno", auth([2, student]), changePassword);
router.post(
  "/get-student-by-rollno",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getStudentByRollno
);
router.get(
  "/get-student-by-partial-name",
  auth([6, messAdmin, hostelAdmin, hostelWarden, careTaker, hostelSecretary]),
  getStudentByPartialName
);
router.get(
  "/get-all-students",
  auth([6, messAdmin, hostelAdmin, hostelWarden, careTaker, hostelSecretary]),
  getAllStudents
);
router.get(
  "/get-student-by-rollno",
  auth([6, messAdmin, hostelAdmin, hostelWarden, careTaker, hostelSecretary]),
  getStudentByRollno
);

module.exports = router;
