const httpStatus = require('http-status');
const catchAsync = require('../utils/CatchAsync');
const  authService = require('../services/AuthService');


const login = catchAsync(async (req, res) => {
  const { id, password } = req.body;
  //login


  //generate token

  
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send("success");
});

 const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

 const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  res.status(httpStatus.NO_CONTENT).send(resetPasswordToken);
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
