const express = require('express');
const {
    createMess,
    updateMessDetails,
    getMessDetails, 
    getMessDetailsByName, 
    getMessDetailsByMessId
} = require('../controllers/mess');
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

// mess table
router.post('',createMess);
router.post('/update',updateMessDetails);
router.get('',getMessDetails);
router.get('/messid/:messId',getMessDetailsByMessId);
router.get('/name/:name',getMessDetailsByName);


//messadmin



module.exports = router;

