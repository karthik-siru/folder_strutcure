const express = require("express");
const router = express.Router();

//controllers
const {
  getAllPreferences,
  getPreferencesById,
  createPreference,
  updatePreferences,
  deletePreferences,
} = require("../controllers/preferences");

// routes
router.post("/create", createPreference);
router.post("/update/:id", updatePreferences);
router.get("/all", getAllPreferences);
router.get("/:id", getPreferencesById);
router.delete("/deleteAll", deletePreferences);

module.exports = router;
