const express = require("express");
 const {
   userLogin,
//   logout,
//   resetPassword,
//   forgotPassword,
 } = require("../controllers/user");
 const auth = require("../middlewares/auth");
const router = express.Router();

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
router.post("/login", userLogin);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
// router.post("/logout", auth(), logout);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
// router.post("/forgot-password", authController.forgotPassword);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
// router.post("/reset-password", authController.resetPassword);

module.exports = router;
