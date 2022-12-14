const express = require("express");
const authRoute = require("./AuthRoute");
const messRoute = require("./MessRoute");
const studentRoute = require("./StudentRoute");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/mess", messRoute);
router.use("/student", studentRoute);
module.exports = router;
