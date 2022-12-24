const  httpStatus = require( 'http-status');
const student = require('../models/student');
const jwt = require('jsonwebtoken')

const auth = (table) => async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const len = table[0];
      let data=null;
      for(let i=1;i<len;i++){
        if(table[i]==student) data =data ||  await student.findOne({ where: { rollno: decoded.id } })
        else data = data || await table[i].findOne({ where: { email: decoded.id } })
        if(data) break;
      }
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
  auth
}