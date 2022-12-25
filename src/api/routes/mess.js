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
const { studentAuth, messAdminAuth } = require("../middlewares/auth");
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
router.post("/mess-admin", createMessAdmin);
router.post("/mess-admin/update", updateMessAdmin);
router.get("/mess-admin", studentAuth(), getMessAdmin);
router.get("/mess-admin/:messId", studentAuth(), getMessAdminByMessId);

//mess-admin-archives
router.post("/mess-admin-archives", createMessAdminArchives); //add hosteladminAuth as middleware
router.get("/mess-admin-archives", messAdminAuth(), getMessAdminArchives);
router.get(
  "/mess-admin-archives/:messId",
  messAdminAuth(),
  getMessAdminArchivesByMessId
);

router.post("/mess-user", studentAuth(), createMessUser);
router.post("/mess-user/update", studentAuth(), updateMessUser);
router.get("/mess-user/:studentId/:year/:month", studentAuth(), getMyMess);
router.get("/mess-user/:year/:month", getMessUser);
router.get("/mess-user-byid/:messId/:year/:month", getMessUserByMessId);

//mess-review
router.post("/mess-review", studentAuth(), createMessReview);
router.post("/check-mess-review", studentAuth(), checkMessReview);
router.get("/mess-review", studentAuth(), getMessReview);
router.get("/mess-review/:messId", studentAuth(), getMessReviewByMessId);

// mess table
router.post("", createMess);
router.post("/update", messAdminAuth(), updateMessDetails);
router.get("", studentAuth(), getMessDetails);
router.get("/:messId", studentAuth(), getMessDetailsByMessId);

//mess-user

module.exports = router;
