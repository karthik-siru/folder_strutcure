const express = require("express");
const router = express.Router();

// middleware
const { getStudentById } = require("../middlewares/student");
<<<<<<< HEAD
const { studentAuth } = require("../middlewares/auth");
=======
>>>>>>> b4a64c54736777ffa219c02bac675b1431501661
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
<<<<<<< HEAD
router.post("/register", registerStudent);
router.post("/forgot-password/:rollno", studentAuth(), forgotPassword);
router.post("/change-password/:rollno", studentAuth(), changePassword);
router.get("/get-student-by-rollno", studentAuth(), getStudentByRollno);
router.get(
  "/get-student-by-partial-name",
  studentAuth(),
  getStudentByPartialName
);
router.get("/get-all-students", getAllStudents);
=======

router.post("/register", auth([2, hostelAdmin]), registerStudent);
router.post("/forgot-password/:rollno", forgotPassword);
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
>>>>>>> b4a64c54736777ffa219c02bac675b1431501661

module.exports = router;
