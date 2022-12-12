const express = require('express');
const authValidation = require('../validations/AuthValidation');
const authController = require('../controllers/AuthController');
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
router.post('/login', validate(authValidation.login), authController.login);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
router.post('/logout', auth(), validate(authValidation.logout), authController.logout);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);

/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: user information
 */
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;