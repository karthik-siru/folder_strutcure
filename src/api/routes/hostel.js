const express = require('express');
const {
  getHostelDetails,
  getHostelDetailsByHostelId,
  updateHostelDetails,
  createHostel,
  getHostelAdmin,
  createHostelAdmin,
  adminLogin,
  getHostelAdminByHostelId,
  updateHostelAdmin,
  getHostelAdminArchives,
  createHostelAdminArchives,
  getHostelAdminArchivesByHostelId,
  getHostelUser,
  getMyHostel,
  getHostelUserByHostelId,
  createHostelUser,
  updateHostelUser,
  getHostelWarden,
  createHostelWarden,
  wardenLogin,
  getHostelWardenByHostelId,
  updateHostelWarden,
  getHostelWardenArchives,
  createHostelWardenArchives,
  getHostelWardenArchivesByHostelId,
  getCareTaker,
  createCareTaker,
  careTakerLogin_,
  getCareTakerByHostelId,
  updateCareTaker,
  getCareTakerArchives,
  createCareTakerArchives,
  getCareTakerArchivesByHostelId,
} = require('../controllers/hostel');
const { studentAuth,hostelAdminAuth } = require("../middlewares/auth")
const router = express.Router();


/**
 * @openapi
 * /me:
 *   get:
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: hostel information
 */

// hostel table
router.post('',createHostel);
router.post('/update',updateHostelDetails);
router.get('',studentAuth(), getHostelDetails);
router.get('/:hostelId',studentAuth(), getHostelDetailsByHostelId);


//hostel-admin
router.post('/hostel-admin/login',adminLogin);
router.post('/hostel-admin',createHostelAdmin);
router.post('/hostel-admin/update',updateHostelAdmin);
router.get('/hostel-admin',studentAuth(), getHostelAdmin);
router.get('/hostel-admin/:hostelId',studentAuth(), getHostelAdminByHostelId);

//hostel-admin-archives
router.post('/hostel-admin-archives',createHostelAdminArchives);
router.get('/hostel-admin-archives', getHostelAdminArchives);
router.get('/hostel-admin-archives/:hostelId', getHostelAdminArchivesByHostelId);

//hostel-user
router.post('/hostel-user',studentAuth(),createHostelUser);
router.get('/my-hostel/:studentId/:year',studentAuth(),getMyHostel);
router.get('/hostel-user/:year', getHostelUser);
router.get('/hostel-user/:hostelId/:year', getHostelUserByHostelId);

//hostel-admin
router.post('/hostel-warden/login',wardenLogin);
router.post('/hostel-warden',createHostelWarden);
router.post('/hostel-warden/update',updateHostelWarden);
router.get('/hostel-warden',studentAuth(), getHostelWarden);
router.get('/hostel-warden/:hostelId',studentAuth(), getHostelWardenByHostelId);

//hostel-warden-archives
router.post('/hostel-warden-archives',createHostelWardenArchives);
router.get('/hostel-warden-archives', getHostelWardenArchives);
router.get('/hostel-warden-archives/:hostelId', getHostelWardenArchivesByHostelId);

//hostel-admin
router.post('/care-taker/login',careTakerLogin_);
router.post('/care-taker',createCareTaker);
router.post('/care-taker/update',updateCareTaker);
router.get('/care-taker',studentAuth(), getCareTaker);
router.get('/care-taker/:hostelId',studentAuth(), getCareTakerByHostelId);

//care-taker-archives
router.post('/care-taker-archives',createCareTakerArchives);
router.get('/care-taker-archives', getCareTakerArchives);
router.get('/care-taker-archives/:hostelId', getCareTakerArchivesByHostelId);


module.exports = router;

