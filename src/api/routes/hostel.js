const express = require('express');
const {
  getHostelDetails,
  getHostelDetailsByHostelId,
  updateHostelDetails,
  createHostel,
  getHostelSecretary,
  createHostelSecretary,
  adminLogin,
  getHostelSecretaryByHostelId,
  updateHostelSecretary,
  getHostelSecretaryArchives,
  createHostelSecretaryArchives,
  getHostelSecretaryArchivesByHostelId,
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
const { auth } = require("../middlewares/auth")
const student = require("../models/student")
const { messAdmin } = require("../models/mess")
const { hostelSecretary,hostelWarden, careTaker } = require("../models/hostel")
const { hostelAdmin } = require("../models/hostelAdmin")
const { has } = require("../models/has")
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
router.post('',auth([2,hostelAdmin]),createHostel);
router.post('/update',auth([2,hostelAdmin]),updateHostelDetails);
router.get('',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelDetails);
router.get('/:hostelId',auth([7,student,messAdmin,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelDetailsByHostelId);


//hostel-admin
router.post('/hostel-admin/login',adminLogin);
router.post('/hostel-admin',auth([4,hostelAdmin,hostelWarden,careTaker]),createHostelSecretary);
router.post('/hostel-admin/update',auth([5,hostelAdmin,hostelWarden,careTaker,hostelSecretary]),updateHostelSecretary);
router.get('/hostel-admin',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelSecretary);
router.get('/hostel-admin/:hostelId',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelSecretaryByHostelId);

//hostel-admin-archives
router.post('/hostel-admin-archives',auth([4,hostelAdmin,hostelWarden,careTaker]),createHostelSecretaryArchives);
router.get('/hostel-admin-archives',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelSecretaryArchives);
router.get('/hostel-admin-archives/:hostelId',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelSecretaryArchivesByHostelId);

//hostel-user
router.post('/hostel-user',auth([4,hostelAdmin,hostelWarden,careTaker]),createHostelUser);
router.get('/my-hostel/:studentId/:year',auth([2,student]),getMyHostel);
router.get('/hostel-user/:year',auth([4,hostelAdmin,hostelWarden,careTaker]), getHostelUser);
router.get('/hostel-user/:hostelId/:year',auth([4,hostelAdmin,hostelWarden,careTaker]), getHostelUserByHostelId);

//hostel-admin
router.post('/hostel-warden/login',wardenLogin);
router.post('/hostel-warden',auth([2,hostelAdmin]),createHostelWarden);
router.post('/hostel-warden/update',auth([3,hostelAdmin,hostelWarden]),updateHostelWarden);
router.get('/hostel-warden',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelWarden);
router.get('/hostel-warden/:hostelId',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelWardenByHostelId);

//hostel-warden-archives
router.post('/hostel-warden-archives',auth([2,hostelAdmin]),createHostelWardenArchives);
router.get('/hostel-warden-archives',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelWardenArchives);
router.get('/hostel-warden-archives/:hostelId',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getHostelWardenArchivesByHostelId);

//hostel-admin
router.post('/care-taker/login',careTakerLogin_);
router.post('/care-taker',auth([2,hostelAdmin]),createCareTaker);
router.post('/care-taker/update',auth([3,hostelAdmin,careTaker]),updateCareTaker);
router.get('/care-taker',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getCareTaker);
router.get('/care-taker/:hostelId',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getCareTakerByHostelId);

//care-taker-archives
router.post('/care-taker-archives',auth([2,hostelAdmin]),createCareTakerArchives);
router.get('/care-taker-archives',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getCareTakerArchives);
router.get('/care-taker-archives/:hostelId',auth([6,student,hostelAdmin,hostelWarden,careTaker,hostelSecretary]), getCareTakerArchivesByHostelId);


module.exports = router;

