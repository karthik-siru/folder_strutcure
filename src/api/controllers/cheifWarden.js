const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { 
    cheifWarden,
    cheifWardenArchives
} = require("../models/cheifWarden");
const { cheifWardenLogin } = require("./auth")
const bcrypt = require('bcryptjs');

const getCheifWarden = catchAsync(async (req, res) => {
  const data = await cheifWarden.findOne();
  res.status(200).json({
      data: data,
  });
});


const login = catchAsync(async (req, res) => {
    const data=await cheifWardenLogin(req.body.email,req.body.pswd);
    res.status(200).json({
      data: data,
    });
});

const createCheifWarden = catchAsync(async (req, res) => {
    const admin = await cheifWarden.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const pswd = await bcrypt.hash(body.pswd,8);
        const data = await cheifWarden.create({
            name: body.name,
            email: body.email,
            pswd: pswd,
            phno: body.phno
        });
        res.status(200).json({
          data: data,
        });
    }else{
        res.status(401).json({
            err: "email already exits",
        });
    }
});

const updateCheifWarden = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await cheifWarden.update({
      name: body.name,
      phno: body.phno,
  },
  { where: { email: req.body.email } });
  if(data[0]) res.status(200).json({message: "successfully updated"});
  else res.status(401).json({err: "Admin with that email not exists"});
});

const getCheifWardenArchives = catchAsync(async (req, res) => {
  const data = await cheifWardenArchives.findAll();
  res.status(200).json({
      data: data,
  });
});

const createCheifWardenArchives = catchAsync(async (req, res) => {
    const admin = await cheifWardenArchives.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const data = await cheifWardenArchives.create({
            name: body.name,
            email: body.email,
            phno: body.phno,
            fromDate: body.fromDate,
            toDate: body.toDate
        });
        res.status(200).json({
      data: data,
  });
    }else{
        res.status(401).json({
            err: "email already exits",
        });
    }
});

module.exports={
    cheifWarden,
    cheifWardenArchives
}