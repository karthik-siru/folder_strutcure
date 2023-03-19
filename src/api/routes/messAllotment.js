const express = require("express");
const router = express.Router();

//controllers
const { messAllotment } = require("../controllers/messAllotment");
// routes
router.get("/allocate", messAllotment);

module.exports = router;
