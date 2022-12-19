const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { 
    hostel, 
    hostelAdmin, 
    hostelAdminArchives, 
    hostelUser,
    hostelWarden,
    hostelWardenArchives,
    careTaker,
    careTakerArchives
} = require("../models/hostel");
const { 
    hostelAdminLogin,
    hostelWardenLogin,
    careTakerLogin
} = require("./auth")
const bcrypt = require('bcryptjs');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

const getHostelDetails = catchAsync(async (req, res) => {
    const data = await  hostel.findAll();
    res.send(data);
});

const createHostel = catchAsync(async (req, res) => {
    const hostelData = await hostel.findOne({ where: { hostelId: req.body.hostelId } });
    if(hostelData==null){
        const body = req.body;
        const data = await hostel.create({
            name: body.name,
            hostelId: body.hostelId,
            description: body.description,
            rooms: body.rooms,
            floors: body.floors,
            phno: body.phno
        });
        res.send(data);
    }else{
        res.status(401).json({
            err: "hostel with that already exits",
        });
    }
});

const getHostelDetailsByHostelId = catchAsync(async (req, res) => {
    const data = await  hostel.findOne({ where: { hostelId: req.params.hostelId } });
    res.send(data);
});

const updateHostelDetails = catchAsync(async (req, res) => {
    const body=req.body;
    const data = await hostel.update(
        {
            name: body.name,
            description: body.description,
            rooms: body.rooms,
            floors: body.floors,
            phno: body.phno
        },
        { where: { hostelId: body.hostelId } }
    )
    res.send(data);
});


const getHostelAdmin = catchAsync(async (req, res) => {
    const data = await  hostelAdmin.findAll();
    res.send(data);
});


const adminLogin = catchAsync(async (req, res) => {
    const data=await hostelAdminLogin(req.body.email,req.body.pswd);
    res.send(data);
});

const getHostelAdminByHostelId = catchAsync(async (req, res) => {
    const data = await  hostelAdmin.findAll({ where: { hostelId: req.params.hostelId } });
    res.send(data);
});

const createHostelAdmin = catchAsync(async (req, res) => {
    const admin = await hostelAdmin.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const pswd = await bcrypt.hash(body.pswd,8);
        const data = await hostelAdmin.create({
            name: body.name,
            email: body.email,
            pswd: pswd,
            phno: body.phno,
            hostelId: body.hostelId
        });
        res.send(data);
    }else{
        res.status(401).json({
            err: "admin with that email already exits",
        });
    }
});

const updateHostelAdmin = catchAsync(async (req, res) => {
    const admin = await hostelAdmin.findOne({ where: { email: req.body.email } });
    if(!admin){
        res.status(401).json({
            err: "admin with that email not exits",
        });
    }else{
        const body = req.body;
        const data = await hostelAdmin.update({
            name: body.name,
            phno: body.phno,
        });
        res.send(data);
    }
});

const getHostelAdminArchives = catchAsync(async (req, res) => {
    const data = await  hostelAdminArchives.findAll();
    res.send(data);
});

const getHostelAdminArchivesByHostelId = catchAsync(async (req, res) => {
    const data = await  hostelAdminArchives.findAll({ where: { hostelId: req.params.hostelId } });
    res.send(data);
});

const createHostelAdminArchives = catchAsync(async (req, res) => {
    const admin = await hostelAdminArchives.findOne({ where: { email: req.body.email } });
    if(admin==null){
        const body = req.body;
        const data = await hostelAdminArchives.create({
            name: body.name,
            email: body.email,
            phno: body.phno,
            hostelId: body.hostelId,
            fromDate: body.fromDate,
            toDate: body.toDate
        });
        res.send(data);
    }else{
        res.status(401).json({
            err: "admin with that email already exits",
        });
    }
});

const getHostelUser = catchAsync(async (req, res) => {
    const data = await  hostelUser.findAll({where: {year:req.params.year }});
    res.send(data);
});

const getMyHostel = catchAsync(async (req, res) => {
    const data = await  hostelUser.findAll({where: {studentId: req.params.studentId, year:req.params.year }});
    res.send(data);
});

const getHostelUserByHostelId = catchAsync(async (req, res) => {
    const data = await  hostelUser.findAll({ where: { hostelId: req.params.hostelId, year:req.params.year  } });
    res.send(data);
});

const createHostelUser = catchAsync(async (req, res) => {
    const user = await hostelUser.findOne({ where: { hostelId: req.body.hostelId, studentId: req.body.studentId, year:year, month:month  } });
    if(user==null){
        const body = req.body;
        const data = await hostelUser.create({
            hostelId: body.hostelId,
            studentId: body.studentId,
            year: year,
        });
        res.send(data);
    }else{
        res.status(401).json({
            err: "Hostel already allocated",
        });
    }
});

const updateHostelUser = catchAsync(async (req, res) => {
    const admin = await hostelAdmin.findOne({ where: { hostelId: req.body.hostelId, studentId: req.body.studentId, year:year } });
    if(!admin){
        res.status(401).json({
            err: "Hostel not allocated",
        });
    }else{
        const body = req.body;
        const data = await hostelAdmin.update({
            hostelId: body.hostelId,
        });
        res.send(data);
    }
});


const getHostelWarden = catchAsync(async (req, res) => {
    const data = await  hostelWarden.findAll();
    res.send(data);
});


const wardenLogin = catchAsync(async (req, res) => {
    const data=await hostelWardenLogin(req.body.email,req.body.pswd);
    res.send(data);
});

const getHostelWardenByHostelId = catchAsync(async (req, res) => {
    const data = await  hostelWarden.findAll({ where: { hostelId: req.params.hostelId } });
    res.send(data);
});

const createHostelWarden = catchAsync(async (req, res) => {
    const warden = await hostelWarden.findOne({ where: { email: req.body.email } });
    if(warden==null){
        const body = req.body;
        const pswd = await bcrypt.hash(body.pswd,8);
        const data = await hostelWarden.create({
            name: body.name,
            email: body.email,
            pswd: pswd,
            phno: body.phno,
            hostelId: body.hostelId,
            department: body.department
        });
        res.send(data);
    }else{
        res.status(401).json({
            err: "warden with that email already exits",
        });
    }
});

const updateHostelWarden = catchAsync(async (req, res) => {
    const warden = await hostelWarden.findOne({ where: { email: req.body.email } });
    if(!warden){
        res.status(401).json({
            err: "admin with that email not exits",
        });
    }else{
        const body = req.body;
        const data = await hostelWarden.update({
            name: body.name,
            phno: body.phno,
            department: body.department
        });
        res.send(data);
    }
});

const getHostelWardenArchives = catchAsync(async (req, res) => {
    const data = await  hostelWardenArchives.findAll();
    res.send(data);
});

const getHostelWardenArchivesByHostelId = catchAsync(async (req, res) => {
    const data = await  hostelWardenArchives.findAll({ where: { hostelId: req.params.hostelId } });
    res.send(data);
});

const createHostelWardenArchives = catchAsync(async (req, res) => {
    const warden = await hostelWardenArchives.findOne({ where: { email: req.body.email } });
    if(warden==null){
        const body = req.body;
        const data = await hostelWardenArchives.create({
            name: body.name,
            email: body.email,
            phno: body.phno,
            hostelId: body.hostelId,
            department: body.department,
            fromDate: body.fromDate,
            toDate: body.toDate
        });
        res.send(data);
    }else{
        res.status(401).json({
            err: "warden with that email already exits",
        });
    }
});


const careTakerLogin_ = catchAsync(async (req, res) => {
    const data=await careTakerLogin(req.body.email,req.body.pswd);
    res.send(data);
});

const getCareTaker = catchAsync(async (req, res) => {
    const data = await  careTaker.findAll();
    res.send(data);
});

const getCareTakerByHostelId = catchAsync(async (req, res) => {
    const data = await  careTaker.findAll({ where: { hostelId: req.params.hostelId } });
    res.send(data);
});

const createCareTaker = catchAsync(async (req, res) => {
    const warden = await careTaker.findOne({ where: { email: req.body.email } });
    if(warden==null){
        const body = req.body;
        const pswd = await bcrypt.hash(body.pswd,8);
        const data = await careTaker.create({
            name: body.name,
            email: body.email,
            pswd: pswd,
            phno: body.phno,
            hostelId: body.hostelId,
            department: body.department
        });
        res.send(data);
    }else{
        res.status(401).json({
            err: "warden with that email already exits",
        });
    }
});

const updateCareTaker = catchAsync(async (req, res) => {
    const warden = await careTaker.findOne({ where: { email: req.body.email } });
    if(!warden){
        res.status(401).json({
            err: "admin with that email not exits",
        });
    }else{
        const body = req.body;
        const data = await careTaker.update({
            name: body.name,
            phno: body.phno,
            department: body.department
        });
        res.send(data);
    }
});

const getCareTakerArchives = catchAsync(async (req, res) => {
    const data = await  careTakerArchives.findAll();
    res.send(data);
});

const getCareTakerArchivesByHostelId = catchAsync(async (req, res) => {
    const data = await  careTakerArchives.findAll({ where: { hostelId: req.params.hostelId } });
    res.send(data);
});

const createCareTakerArchives = catchAsync(async (req, res) => {
    const warden = await careTakerArchives.findOne({ where: { email: req.body.email } });
    if(warden==null){
        const body = req.body;
        const data = await careTakerArchives.create({
            name: body.name,
            email: body.email,
            phno: body.phno,
            hostelId: body.hostelId,
            department: body.department,
            fromDate: body.fromDate,
            toDate: body.toDate
        });
        res.send(data);
    }else{
        res.status(401).json({
            err: "warden with that email already exits",
        });
    }
});

module.exports = {
  getHostelDetails,
  getHostelDetailsByHostelId,
  updateHostelDetails,
  createHostel,
  getHostelAdmin,
  createHostelAdmin,
  adminLogin,
  getHostelAdminByHostelId,
  updateHostelAdmin,
  getHostelAdminArchives,
  createHostelAdminArchives,
  getHostelAdminArchivesByHostelId,
  getHostelUser,
  getMyHostel,
  getHostelUserByHostelId,
  createHostelUser,
  updateHostelUser,
  getHostelWarden,
  createHostelWarden,
  wardenLogin,
  getHostelWardenByHostelId,
  updateHostelWarden,
  getHostelWardenArchives,
  createHostelWardenArchives,
  getHostelWardenArchivesByHostelId,
  getCareTaker,
  createCareTaker,
  careTakerLogin_,
  getCareTakerByHostelId,
  updateCareTaker,
  getCareTakerArchives,
  createCareTakerArchives,
  getCareTakerArchivesByHostelId,
};
