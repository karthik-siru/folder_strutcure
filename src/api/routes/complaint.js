const express = require("express");
const router = express.Router();
const { registerMessComplaint, registerHostelComplaint, registerAnonyComplaint, getMessComplaints, getHostelComplaints, getAnonyComplaints } = require("../controllers/complaint")

const complaint = require("../models/complaint")

router.get("/", (req, res) => res.send('Welcome'));

router.post("/mess", registerMessComplaint);
router.post("/hostel", registerHostelComplaint);
router.post("/anonymous", registerAnonyComplaint);

router.get("/mess/:messId", getMessComplaints);
router.get("/hostel/:hostelId", getHostelComplaints);
router.get("/anonymous", getAnonyComplaints);

module.exports = router;