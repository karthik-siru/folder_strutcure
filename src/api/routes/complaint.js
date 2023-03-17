const express = require("express");
const router = express.Router();
const { registerComplaint } = require("../controllers/complaint")

const complaint = require("../models/complaint")

router.get("/", (req, res) => res.send('Welcome'));

router.post("/", registerComplaint);

module.exports = router;