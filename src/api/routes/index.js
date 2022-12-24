const express = require("express");
const authRoute = require("./auth");
const messRoute = require("./mess");
const hostelRoute = require("./hostel");
const studentRoute = require("./student");
//const cheifWardenRoute = require("./cheifWarden");
//const hostelManagerRoute = require("./hostelManager");
//const hostelOfficeAdminRoute = require("./hostelofficeAdmin");
//const hasRoute = require("./has");

const router = express.Router();


router.use("/auth", authRoute);
router.use("/mess", messRoute);
router.use("/hostel", hostelRoute);
router.use("/student", studentRoute);
//router.use("/cheif-warden", cheifWardenRoute);
//router.use("/hostel-manager", hostelManagerRoute);
//router.use("/hostel-office-admin", hostelOfficeAdminRoute);
//router.use("/has", hasRoute);
module.exports = router;
