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
  checkMessReview,
  getMessReviewByMessId,
  createMessAvailability,
  getMessAvailability,
  getMessAvailabilityByMessId,
  getMessUserByStudentId,
  getMessAdminByEmail,
  previousMessDetails,
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
router.post("/mess-admin-by-email", auth([2, messAdmin]), getMessAdminByEmail);
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

router.post("/mess-user", auth([3, student, messAdmin]), createMessUser);
router.post("/mess-user/update", auth([2, student]), updateMessUser);
router.get("/mess-user/:studentId/:year/:month", auth([2, student]), getMyMess);
router.get(
  "/previous-mess-user/:studentId",
  auth([2, student]),
  previousMessDetails
);
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

router.get(
  "/mess-user-studentid/:studentId",
  auth([6, student, messAdmin, hostelAdmin, hostelWarden, careTaker]),
  getMessUserByStudentId
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
  "/mess-review/:messId/:year/:month",
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
// router.post("/create", createMess);
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

//mess-availabilty

router.post("/mess-availability/create", createMessAvailability);
router.get(
  "/mess-availablity/:id",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getMessAvailability
);
router.get(
  "/mess-availablitybyid/:messId",
  auth([
    7,
    student,
    messAdmin,
    hostelAdmin,
    hostelWarden,
    careTaker,
    hostelSecretary,
  ]),
  getMessAvailabilityByMessId
);

module.exports = router;
