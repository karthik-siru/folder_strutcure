const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { messAdmin } = require("../models/mess");
const { hostelAdmin, hostelWarden, careTaker } = require("../models/hostel");
const student = require("../models/student");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const studentLogin = async (rollno, pswd) => {
  const data = await student.findOne({ where: { rollno: rollno } });
  if (!data) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Roll number not exist");
  }
  if (!bcrypt.compare(pswd, data.pswd)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  const token = await generateToken(rollno);
  data.dataValues["token"] = token;
  data.dataValues.pswd = undefined;
  return data;
};

const messAdminLogin = async (email, pswd) => {
  const admin = await messAdmin.findOne({ where: { email: email } });
  if (!admin) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "email not exist");
  }
  if (!bcrypt.compare(pswd, admin.pswd)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  const token = await generateToken(rollno);
  data.dataValues["token"] = token;
  return data;
};

const hostelAdminLogin = async (email, pswd) => {
  const admin = await hostelAdmin.findOne({ where: { email: email } });
  if (!admin) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "email not exist");
  }
  if (!bcrypt.compare(pswd, admin.pswd)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  const token = await generateToken(email);
  return { admin, token };
};

const hostelWardenLogin = async (email, pswd) => {
  const admin = await hostelWarden.findOne({ where: { email: email } });
  if (!admin) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "email not exist");
  }
  if (!bcrypt.compare(pswd, admin.pswd)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  const token = await generateToken(email);
  return { admin, token };
};

const careTakerLogin = async (email, pswd) => {
  const admin = await careTaker.findOne({ where: { email: email } });
  if (!admin) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "email not exist");
  }
  if (!bcrypt.compare(pswd, admin.pswd)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  const token = await generateToken(email);
  return { admin, token };
};

const logout = catchAsync(async (req, res) => {});

const forgotPassword = catchAsync(async (req, res) => {});

const resetPassword = catchAsync(async (req, res) => {});

module.exports = {
  studentLogin,
  logout,
  forgotPassword,
  resetPassword,
  messAdminLogin,
  hostelAdminLogin,
  hostelWardenLogin,
  careTakerLogin,
};
