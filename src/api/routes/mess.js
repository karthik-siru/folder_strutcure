const express = require("express");
const {
  createMess,
  updateMessDetails,
  getMessDetails,
  getMessDetailsByMessId,
  createMessAdmin,
  updateMessAdmin,
  getMessAdmin,
  adminLogin,
  getMessAdminByMessId,
  createMessAdminArchives,
  getMessAdminArchives,
  getMessAdminArchivesByMessId,
  getMessUser,
  getMyMess,
  getMessUserByMessId,
  createMessUser,
  updateMessUser,
  createMessReview,
  getMessReview,
  getMessReviewByMessId,
  checkMessReview,
} = require("../controllers/mess");
const student = require("../models/student");
const { messAdmin } = require("../models/mess");
const {
  hostelSecretary,
  hostelWarden,
  careTaker,
} = require("../models/hostel");
const { hostelAdmin } = require("../models/hostelAdmin");
const { has } = require("../models/has");
const { auth } = require("../middlewares/auth");
const router = express.Router();

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: mess information
 */

//mess-admin
router.post("/mess-admin/login", adminLogin);
router.post("/mess-admin", auth([2, hostelAdmin]), createMessAdmin);
router.post("/mess-admin/update", auth([2, hostelAdmin]), updateMessAdmin);
router.get(
  "/mess-admin",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getMessAdmin
);
router.get(
  "/mess-admin/:messId",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getMessAdminByMessId
);

//mess-admin-archives
router.post(
  "/mess-admin-archives",
  auth([2, hostelAdmin]),
  createMessAdminArchives
);
router.get(
  "/mess-admin-archives",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getMessAdminArchives
);
router.get(
  "/mess-admin-archives/:messId",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getMessAdminArchivesByMessId
);

router.post("/mess-user", auth([2, student]), createMessUser);
router.post("/mess-user/update", auth([2, student]), updateMessUser);
router.get("/mess-user/:studentId/:year/:month", auth([2, student]), getMyMess);
router.get(
  "/mess-user/:year/:month",
  auth([5, messAdmin, hostelAdmin, hostelWarden, careTaker]),
  getMessUser
);
router.get(
  "/mess-user-byid/:messId/:year/:month",
  auth([5, messAdmin, hostelAdmin, hostelWarden, careTaker]),
  getMessUserByMessId
);

//mess-review
router.post("/mess-review", auth([2, student]), createMessReview);
router.post("/check-mess-review", auth([2, student]), checkMessReview);
router.get(
  "/mess-review",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getMessReview
);
router.get(
  "/mess-review/:messId",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getMessReviewByMessId
);

// mess table
router.post("", auth([2, hostelAdmin]), createMess);
router.post("/update", auth([2, hostelAdmin]), updateMessDetails);
router.get(
  "",
  auth([
    7,
    student,
    hostelAdmin,
    hostelWarden,
    careTaker,
    messAdmin,
    hostelSecretary,
  ]),
  getMessDetails
);
router.get(
  "/:messId",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getMessDetailsByMessId
);

//mess-user

module.exports = router;
