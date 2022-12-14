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

router.post('',messController.createMess);
router.post('/update',messController.updateMessDetails);
router.get('',messController.getMessDetails);
router.get('/messid/:messId',messController.getMessDetailsByMessId);
router.get('/name/:name',messController.getMessDetailsByName);



module.exports = router;

