const express = require("express");
const authRoute = require("./auth");
const messRoute = require("./mess");
const hostelRoute = require("./hostel");
const studentRoute = require("./student");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/mess", messRoute);
router.use("/hostel", hostelRoute);
router.use("/student", studentRoute);
module.exports = router;
