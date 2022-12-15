const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { mess, messAdmin } = require("../models/mess");
const { messAdminLogin } = require("./auth")
const bcrypt = require('bcryptjs');

const getMessDetails = catchAsync(async (req, res) => {
    const data = await  mess.findAll();
    res.send(data);
});

const createMess = catchAsync(async (req, res) => {
    console.log(req.body)
    const messData = await mess.findOne({ where: { messId: req.body.messId } });
    if(messData==null){
        const body = req.body;
        const data = await mess.create({
            name: body.name,
            messId: body.messId,
            description: body.description,
            isVeg: body.isVeg,
            capacity: body.capacity,
            boyCapacity: body.boyCapacity,
            girlCapacity: body.girlCapacity,
            menu: body.menu,
            charges: body.charges
        });
        res.send(data);
    }else{
        res.status(401).json({
            message: "mess with that already exits",
        });
    }
});

const getMessDetailsByName = catchAsync(async (req, res) => {
    const data = await  mess.findOne({ where: { name: req.params.name } });
    res.send(data);
});

const getMessDetailsByMessId = catchAsync(async (req, res) => {
    const data = await  mess.findOne({ where: { messId: req.params.messId } });
    res.send(data);
});

const updateMessDetails = catchAsync(async (req, res) => {
    const body=req.body;
    console.log(body)
    const data = await mess.update(
        {
            name: body.name,
            description: body.description,
            isVeg: body.isVeg,
            capacity: body.capacity,
            boyCapacity: body.boyCapacity,
            girlCapacity: body.girlCapacity,
            menu: body.menu,
            charges: body.charges
        },
        { where: { messId: body.messId } }
    )
    res.send(data);
});


const getMessAdmin = catchAsync(async (req, res) => {
    const data = await  messAdmin.findAll();
    res.send(data);
});


const AdminLogin = catchAsync(async (req, res) => {
    console.log(req.body)
    const data=await messAdminLogin(req.body.email,req.body.pswd);
    res.send(data);
});

const getMessAdminByMessId = catchAsync(async (req, res) => {
    const data = await  messAdmin.findAll({ where: { messId: req.params.messId } });
    res.send(data);
});

const createMessAdmin = catchAsync(async (req, res) => {
    const admin = await messAdmin.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        console.log(body)
        const pswd = await bcrypt.hash(body.pswd,8);
        const data = await messAdmin.create({
            name: body.name,
            email: body.email,
            pswd: pswd,
            phno: body.phno,
            messId: body.messId
        });
        res.send(data);
    }else{
        res.status(401).json({
            message: "admin with that email already exits",
        });
    }
});



module.exports = {
  getMessDetails,
  getMessDetailsByMessId,
  getMessDetailsByName,
  updateMessDetails,
  createMess,
  getMessAdmin,
  createMessAdmin,
  AdminLogin,
  getMessAdminByMessId
};
