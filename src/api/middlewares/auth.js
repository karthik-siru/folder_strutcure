const  httpStatus = require( 'http-status');
const  ApiError = require( '../utils/apiError');
const student = require('../models/student');
const { messAdmin } = require('../models/mess');
const jwt = require('jsonwebtoken')

const studentAuth = () => async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      data = await student.findOne({ where: { rollno: decoded.id } })
      //data = data || await messAdmin.findOne({ where: { email: decoded.id } })
      if(data) next()
      else{
        res.status(401).json({
          err:"Not authorized, token failed"
        })
      }
    } catch (error) {
      res.status(401).json({
        err:"Not authorized, token failed"
      })
    }
  }
  if (!token) {
    res.status(401).json({
      err:"Not authorized, no token"
    })
  }
};

const messAdminAuth = () => async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const data = await messAdmin.findOne({ where: { email: decoded.id } })
      if(data) next()
      else{
        res.status(401).json({
          err:"Not authorized, token failed"
        })
      }
    } catch (error) {
      res.status(401).json({
        err:"Not authorized, token failed"
      })
    }
  }
  if (!token) {
    res.status(401).json({
      err:"Not authorized, no token"
    })
  }
};

module.exports= {
  studentAuth,
  messAdminAuth,
}