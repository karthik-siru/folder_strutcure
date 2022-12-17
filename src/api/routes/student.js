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
} = require("../controllers/student");

//params
router.param("rollno", getStudentById);

// routes
router.post("/register", registerStudent);
router.post("/forgot-password/:rollno", forgotPassword);
router.post("/change-password/:rollno", changePassword);
router.get("/get-student-by-rollno", getStudentByRollno);
router.get("/get-student-by-partial-name", getStudentByPartialName);

module.exports = router;
