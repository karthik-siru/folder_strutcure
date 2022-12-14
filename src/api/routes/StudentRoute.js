const express = require("express");
const router = express.Router();

// middleware

//controllers
const StudentController = require("../controllers/StudentController");

router.post("/register", StudentController.registerStudent);

module.exports = router;
