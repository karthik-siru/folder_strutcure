const express = require('express');
const messController = require('../controllers/MessController');
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
router.get('',messController.getMessDetails);

module.exports = router;

