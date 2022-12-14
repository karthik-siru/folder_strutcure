const httpStatus = require('http-status');
const catchAsync = require('../utils/CatchAsync');
const messService  = require('../services/MessService');


const getMessDetails = catchAsync(async (req, res) => {
  const data = await messService.getMessDetails();
  res.send(data);
});

module.exports = {
  getMessDetails
};
