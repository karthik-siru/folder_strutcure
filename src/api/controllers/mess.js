const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { mess, messAdmin, messAdminArchives, messUser, messReview, messAvailability } = require("../models/mess");
const { messAdminLogin } = require("./auth")
const bcrypt = require('bcryptjs');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

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

const updateMessAdmin = catchAsync(async (req, res) => {
    const admin = await messAdmin.findOne({ where: { email: req.body.email } });
    if(!admin){
        res.status(401).json({
            message: "admin with that email not exits",
        });
    }else{
        const body = req.body;
        const data = await messAdmin.update({
            name: body.name,
            phno: body.phno,
        });
        res.send(data);
    }
});

const getMessAdminArchives = catchAsync(async (req, res) => {
    const data = await  messAdminArchives.findAll();
    res.send(data);
});

const getMessAdminArchivesByMessId = catchAsync(async (req, res) => {
    const data = await  messAdminArchives.findAll({ where: { messId: req.params.messId } });
    res.send(data);
});

const createMessAdminArchives = catchAsync(async (req, res) => {
    const admin = await messAdminArchives.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const data = await messAdminArchives.create({
            name: body.name,
            email: body.email,
            phno: body.phno,
            messId: body.messId,
            fromDate: body.fromDate,
            toDate: body.toDate
        });
        res.send(data);
    }else{
        res.status(401).json({
            message: "admin with that email already exits",
        });
    }
});

const getMessUser = catchAsync(async (req, res) => {
    const data = await  messUser.findAll({where: {year:req.params.year, month:req.params.month }});
    res.send(data);
});

const getMyMess = catchAsync(async (req, res) => {
    const data = await  messUser.findAll({where: {studentId: req.params.studentId, year:req.params.year, month:req.params.month }});
    res.send(data);
});

const getMessUserByMessId = catchAsync(async (req, res) => {
    const data = await  messUser.findAll({ where: { messId: req.params.messId, year:req.params.year, month:req.params.month  } });
    res.send(data);
});

const createMessUser = catchAsync(async (req, res) => {
    const user = await messUser.findOne({ where: { messId: req.body.messId, studentId: req.body.studentId, year:year, month:month  } });
    if(user==null){
        const body = req.body;
        const data = await messUser.create({
            messId: body.messId,
            studentId: body.studentId,
            year: year,
            month: month,
        });
        res.send(data);
    }else{
        res.status(401).json({
            message: "Mess already allocated",
        });
    }
});

const updateMessUser = catchAsync(async (req, res) => {
    const admin = await messAdmin.findOne({ where: { messId: req.body.messId, studentId: req.body.studentId, year:year, month:month  } });
    if(!admin){
        res.status(401).json({
            message: "Mess not allocated",
        });
    }else{
        const body = req.body;
        const data = await messAdmin.update({
            messId: body.messId,
        });
        res.send(data);
    }
});

const createMessReview = catchAsync(async (req, res) => {
    const user = await messUser.findOne({ where: { messId: req.body.messId, studentId: req.body.studentId, year:req.body.year, month:req.body.month  } });
    if(user==null){
        const body = req.body;
        const data = await messUser.create({
            messId: body.messId,
            studentId: body.studentId,
            year: body.year,
            month: body.month,
            quality : body.quality,
            quantity : body.quantity,
            taste: body.taste,
            catering : body.catering,
            hygieness: body.hygieness,
            puntuality: body.puntuality,
        });
        res.send(data);
    }else{
        res.status(401).json({
            message: "Review already done",
        });
    }
});

const getMessReview = catchAsync(async (req, res) => {
    const data = await  messUser.findAll();
    res.send(data);
});

const getMessReviewByMessId = catchAsync(async (req, res) => {
    const data = await  messUser.findAll({ where: { messId: req.params.messId} });
    res.send(data);
});

module.exports = {
  getMessDetails,
  getMessDetailsByMessId,
  updateMessDetails,
  createMess,
  getMessAdmin,
  createMessAdmin,
  AdminLogin,
  getMessAdminByMessId,
  updateMessAdmin,
  getMessAdminArchives,
  createMessAdminArchives,
  getMessAdminArchivesByMessId,
  getMessUser,
  getMyMess,
  getMessUserByMessId,
  createMessUser,
  updateMessUser,
  createMessReview,
  getMessReview,
  getMessReviewByMessId
};
