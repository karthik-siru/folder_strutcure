const express = require('express');
const {
    createMess,
    updateMessDetails,
    getMessDetails, 
    getMessDetailsByMessId,
    createMessAdmin,
    getMessAdmin,
    AdminLogin,
    getMessAdminByMessId,
    createMessAdminArchives,
    getMessAdminArchives,
    getMessAdminArchivesByMessId,
    getMessUser,
    getMyMess,
    getMessUserByMessId,
    createMessUser,
    createMessReview,
    getMessReview,
    getMessReviewByMessId
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


//messadmin
router.post('/messadmin/login',AdminLogin);
router.post('/messadmin',createMessAdmin);
router.get('/messadmin',studentAuth(), getMessAdmin);
router.get('/messadmin/:messId',studentAuth(), getMessAdminByMessId);

//messadminarchives
router.post('/messadminarchives',createMessAdminArchives);
router.get('/messadminarchives',messAdminAuth(), getMessAdminArchives);
router.get('/messadminarchives/:messId',messAdminAuth(), getMessAdminArchivesByMessId);

//messuser
router.post('/messuser',studentAuth(),createMessUser);
router.get('/mymess/:year/:month',studentAuth(),getMyMess);
router.get('/messuser/:year/:month', getMessUser);
router.get('/messuser/:messId/:year/:month', getMessUserByMessId);

//messreview
router.post('/messreview',studentAuth(),createMessReview);
router.get('/messreview',studentAuth(), getMessReview);
router.get('/messreview/:messId',studentAuth(), getMessReviewByMessId);

module.exports = router;

