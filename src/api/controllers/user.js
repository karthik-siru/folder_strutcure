const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { login } = require("./auth")


const userLogin = catchAsync(async (req, res) => {
    const data=await login(req.body.id,req.body.pswd);
    res.status(200).json({
      data: data,
    });
});


module.exports={
    userLogin
}