const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { 
    hostelManagerArchives
} = require("../models/hostelManager");
const { hostelAdmin } = require("../models/hostelAdmin");
const user = require("../models/user")
const { hostelManagerLogin } = require("./auth")
const bcrypt = require('bcryptjs');

const getHostelManager = catchAsync(async (req, res) => {
  const data = await hostelAdmin.findOne({where:{role:"hostelManager"}});
  res.status(200).json({
      data: data,
  });
});


const login = catchAsync(async (req, res) => {
    const data=await hostelManagerLogin(req.body.email,req.body.pswd);
    res.status(200).json({
      data: data,
    });
});

const createHostelManager = catchAsync(async (req, res) => {
    const admin = await hostelAdmin.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const pswd = await bcrypt.hash(body.pswd,8);
        const data = await hostelAdmin.create({
            name: body.name,
            email: body.email,
            pswd: pswd,
            phno: body.phno,
            role: "hostelManager"
        });
        const userData = await user.create({
            id: body.email,
            pswd: body.pswd,
            role: "hostelManager"
        })
        res.status(200).json({
          data: data,
        });
    }else{
        res.status(401).json({
            err: "email already exits",
        });
    }
});

const updateHostelManager = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await hostelAdmin.update({
      name: body.name,
      phno: body.phno,
  },
  { where: { email: req.body.email } });
  if(data[0]) res.status(200).json({message: "successfully updated"});
  else res.status(401).json({err: "Admin with that email not exists"});
});

const getHostelManagerArchives = catchAsync(async (req, res) => {
  const data = await hostelManagerArchives.findAll();
  res.status(200).json({
      data: data,
  });
});

const createHostelManagerArchives = catchAsync(async (req, res) => {
    const admin = await hostelManagerArchives.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const data = await hostelManagerArchives.create({
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
    createHostelManager,
    getHostelManager,
    updateHostelManager,
    createHostelManagerArchives,
    getHostelManagerArchives,
    login
}