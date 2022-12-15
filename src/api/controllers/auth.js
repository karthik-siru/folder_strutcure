const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { mess, messAdmin } = require("../models/mess");
const student = require("../models/student");
const  ApiError = require( '../utils/apiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const generateToken = async(id) =>{
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

const studentLogin = async(rollno,password)=>{
  const user = await student.findOne({ where: { rollno: rollno } });
  if(!user){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Roll number not exist');
  }
  if(!bcrypt.compare(password, user.password)){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  const token = generateToken(rollno);
  user["token"]=token;
  return user;
}


const logout = catchAsync(async (req, res) => {
  
});


 const forgotPassword = catchAsync(async (req, res) => {

});

const resetPassword = catchAsync(async (req, res) => {

});


module.exports = {
  studentLogin,
  logout,
  forgotPassword,
  resetPassword,
};
