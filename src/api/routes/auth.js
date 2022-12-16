<<<<<<< HEAD:src/api/routes/AuthRoute.js
const express = require("express");
const authController = require("../controllers/AuthController");
const auth = require("../middlewares/auth");
=======
const express = require('express');
const { login, logout, resetPassword, forgotPassword } = require('../controllers/auth');
const auth = require('../middlewares/auth');
>>>>>>> 37ea00553e5ff33b01fd6535c5d8dd221f6dc75d:src/api/routes/auth.js
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
<<<<<<< HEAD:src/api/routes/AuthRoute.js
router.post("/login", authController.login);
=======
//router.post('/login',authController.login);
>>>>>>> 37ea00553e5ff33b01fd6535c5d8dd221f6dc75d:src/api/routes/auth.js

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
<<<<<<< HEAD:src/api/routes/AuthRoute.js
router.post("/logout", auth(), authController.logout);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
router.post("/refresh-tokens", authController.refreshTokens);
=======
//router.post('/logout', auth(), authController.logout);

>>>>>>> 37ea00553e5ff33b01fd6535c5d8dd221f6dc75d:src/api/routes/auth.js

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
<<<<<<< HEAD:src/api/routes/AuthRoute.js
router.post("/forgot-password", authController.forgotPassword);
=======
//router.post('/forgot-password', authController.forgotPassword);
>>>>>>> 37ea00553e5ff33b01fd6535c5d8dd221f6dc75d:src/api/routes/auth.js

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
<<<<<<< HEAD:src/api/routes/AuthRoute.js
router.post("/reset-password", authController.resetPassword);
=======
//router.post('/reset-password', authController.resetPassword);
>>>>>>> 37ea00553e5ff33b01fd6535c5d8dd221f6dc75d:src/api/routes/auth.js

module.exports = router;
