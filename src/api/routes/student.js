const express = require("express");
const router = express.Router();

// middleware
const { getStudentById } = require("../middlewares/student");
const {studentAuth} = require("../middlewares/auth")
//controllers
const {
  registerStudent,
  forgotPassword,
  changePassword,
  getStudentByPartialName,
  getStudentByRollno,
  Login,
  getAllStudents
} = require("../controllers/student");

//params
router.param("rollno", getStudentById);

// routes
router.post("/login",Login );
router.post("/register", registerStudent);
router.post("/forgot-password/:rollno",studentAuth(), forgotPassword);
router.post("/change-password/:rollno",studentAuth(), changePassword);
router.get("/get-student-by-rollno",studentAuth(), getStudentByRollno);
router.get("/get-student-by-partial-name",studentAuth(), getStudentByPartialName);
router.get("/get-all-students", getAllStudents);

module.exports = router;
