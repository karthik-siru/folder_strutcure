const express = require('express');
const {
    createMess,
    updateMessDetails,
    getMessDetails, 
    getMessDetailsByName, 
    getMessDetailsByMessId,
    createMessAdmin,
    getMessAdmin,
    AdminLogin,
    getMessAdminByMessId
} = require('../controllers/mess');
const { studentAuth,messAdminAuth } = require("../middlewares/auth")
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
router.post('/update',messAdminAuth(),updateMessDetails);
router.get('',studentAuth(), getMessDetails);
router.get('/messid/:messId',studentAuth(), getMessDetailsByMessId);
router.get('/name/:name',studentAuth(), getMessDetailsByName);


//messadmin
router.post('/messadmin/login',AdminLogin);
router.post('/messadmin',createMessAdmin);
router.get('/messadmin',studentAuth(), getMessAdmin);
router.get('/messadmin/:messId',studentAuth(), getMessAdminByMessId);



module.exports = router;

