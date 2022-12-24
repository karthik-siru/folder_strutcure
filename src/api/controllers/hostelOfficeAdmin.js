const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { 
    hostelOfficeAdmin,
    hostelOfficeAdminArchives
} = require("../models/hostelOfficeAdmin");
const { hostelOfficeAdminLogin } = require("./auth")
const bcrypt = require('bcryptjs');

const getHostelOfficeAdmin = catchAsync(async (req, res) => {
  const data = await hostelOfficeAdmin.findOne();
  res.status(200).json({
      data: data,
  });
});


const login = catchAsync(async (req, res) => {
    const data=await hostelOfficeAdminLogin(req.body.email,req.body.pswd);
    res.status(200).json({
      data: data,
    });
});

const createHostelOfficeAdmin = catchAsync(async (req, res) => {
    const admin = await hostelOfficeAdmin.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const pswd = await bcrypt.hash(body.pswd,8);
        const data = await hostelOfficeAdmin.create({
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

const updateHostelOfficeAdmin = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await hostelOfficeAdmin.update({
      name: body.name,
      phno: body.phno,
  },
  { where: { email: req.body.email } });
  if(data[0]) res.status(200).json({message: "successfully updated"});
  else res.status(401).json({err: "Admin with that email not exists"});
});

const getHostelOfficeAdminArchives = catchAsync(async (req, res) => {
  const data = await hostelOfficeAdminArchives.findAll();
  res.status(200).json({
      data: data,
  });
});

const createHostelOfficeAdminArchives = catchAsync(async (req, res) => {
    const admin = await hostelOfficeAdminArchives.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const data = await hostelOfficeAdminArchives.create({
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
    hostelOfficeAdmin,
    hostelOfficeAdminArchives
}