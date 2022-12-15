const express = require("express");
const authRoute = require("./auth");
const messRoute = require("./mess");
const studentRoute = require("./student");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/mess", messRoute);
router.use("/student", studentRoute);
module.exports = router;
