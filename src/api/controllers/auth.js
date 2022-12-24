const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { messAdmin } = require("../models/mess");
const { hostelSecretary, hostelWarden, careTaker } = require("../models/hostel")
const { cheifWarden } = require("../models/cheifWarden");
const { has } = require("../models/has");
const { hostelManager } = require("../models/hostelManager");
const { hostelOfficeAdmin } = require("../models/hostelOfficeAdmin");
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
  data.dataValues["token"]=token
  return data;
};

const messAdminLogin = async (email, pswd) => {
  const data = await messAdmin.findOne({ where: { email: email } });
  if (!data) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "email not exist");
  }
  if (!bcrypt.compare(pswd, data.pswd)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  const token = await generateToken(rollno);
  data.dataValues["token"]=token
  return data;
};

const hostelSecretaryLogin = async(email,pswd)=>{
  const data = await hostelSecretary.findOne({ where: { email: email } });
  if(!data){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email not exist');
  }
  if(!bcrypt.compare(pswd, data.pswd)){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const token = await generateToken(email);
  data.dataValues["token"]=token
 return data;
}

const hostelWardenLogin = async(email,pswd)=>{
  const data = await hostelWarden.findOne({ where: { email: email } });
  if(!data){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email not exist');
  }
  if(!bcrypt.compare(pswd, data.pswd)){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const token = await generateToken(email);
  data.dataValues["token"]=token
 return data;
}

const careTakerLogin = async(email,pswd)=>{
  const data = await careTaker.findOne({ where: { email: email } });
  if(!data){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email not exist');
  }
  if(!bcrypt.compare(pswd, data.pswd)){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const token = await generateToken(email);
  data.dataValues["token"]=token
 return data;
}

const hasLogin = async(email,pswd)=>{
  const data = await has.findOne({ where: { email: email } });
  if(!data){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email not exist');
  }
  if(!bcrypt.compare(pswd, data.pswd)){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const token = await generateToken(email);
  data.dataValues["token"]=token
 return data;
}

const hostelManagerLogin = async(email,pswd)=>{
  const data = await hostelManager.findOne({ where: { email: email } });
  if(!data){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email not exist');
  }
  if(!bcrypt.compare(pswd, data.pswd)){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const token = await generateToken(email);
  data.dataValues["token"]=token
 return data;
}

const cheifWardenLogin = async(email,pswd)=>{
  const data = await cheifWarden.findOne({ where: { email: email } });
  if(!data){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email not exist');
  }
  if(!bcrypt.compare(pswd, data.pswd)){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const token = await generateToken(email);
  data.dataValues["token"]=token
 return data;
}

const hostelOfficeAdminLogin = async(email,pswd)=>{
  const data = await hostelOfficeAdmin.findOne({ where: { email: email } });
  if(!data){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'email not exist');
  }
  if(!bcrypt.compare(pswd, data.pswd)){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const token = await generateToken(email);
  data.dataValues["token"]=token
 return data;
}
const logout = catchAsync(async (req, res) => {});

const forgotPassword = catchAsync(async (req, res) => {});

const resetPassword = catchAsync(async (req, res) => {});

module.exports = {
  studentLogin,
  logout,
  forgotPassword,
  resetPassword,
  messAdminLogin,
  hostelSecretaryLogin,
  hostelWardenLogin,
  careTakerLogin,
  hasLogin,
  hostelOfficeAdminLogin,
  hostelManagerLogin,
  cheifWardenLogin
};
