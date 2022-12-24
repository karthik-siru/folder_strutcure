const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { 
    has,
    hasArchives
} = require("../models/has");
const { hasLogin } = require("./auth")
const bcrypt = require('bcryptjs');

const getHas = catchAsync(async (req, res) => {
  const data = await has.findOne();
  res.status(200).json({
      data: data,
  });
});


const login = catchAsync(async (req, res) => {
    const data=await hasLogin(req.body.email,req.body.pswd);
    res.status(200).json({
      data: data,
    });
});

const createHas = catchAsync(async (req, res) => {
    const admin = await has.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const pswd = await bcrypt.hash(body.pswd,8);
        const data = await has.create({
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

const updateHas = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await has.update({
      name: body.name,
      phno: body.phno,
  },
  { where: { email: req.body.email } });
  if(data[0]) res.status(200).json({message: "successfully updated"});
  else res.status(401).json({err: "Admin with that email not exists"});
});

const getHasArchives = catchAsync(async (req, res) => {
  const data = await hasArchives.findAll();
  res.status(200).json({
      data: data,
  });
});

const createHasArchives = catchAsync(async (req, res) => {
    const admin = await hasArchives.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const data = await hasArchives.create({
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
    has,
    hasArchives
}