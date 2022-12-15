const express = require('express');
const { login, logout, resetPassword, forgotPassword } = require('../controllers/auth');
const auth = require('../middlewares/auth');
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
//router.post('/login',authController.login);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
//router.post('/logout', auth(), authController.logout);


/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
//router.post('/forgot-password', authController.forgotPassword);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
//router.post('/reset-password', authController.resetPassword);

module.exports = router;