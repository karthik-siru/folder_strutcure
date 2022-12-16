const express = require("express");
const router = express.Router();

// middleware

//controllers
const StudentController = require("../controllers/student");

router.post("/register", StudentController.registerStudent);

module.exports = router;
