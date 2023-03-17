const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { dues } = require("../models/dues");

const getDuesByRollno = catchAsync(async (req, res) => {
  const data = await dues.findOne({where : {rollno : req.params.rollno}});
  res.status(200).json({
      data: data,
  });
});

const getDuesByPartialRollno = catchAsync(async (req, res) => {
    const data = await dues.findAll({where: {rollno: {[Op.substring]: req.params.rollno}}});
    res.status(200).json({
        data: data,
    });
});

const getDues = catchAsync(async (req, res) => {
    const data = await dues.findAll();
    res.status(200).json({
        data: data,
    });
});

const updateDues = catchAsync(async (req, res) => {
    for(var i=0; i<req.body.length; i++) {
  const isExist = await dues.findOne({ where: { rollno: req.body.data[i].rollno } });
  const body = req.body.data[i];
  if(isExist==null){
    const data = await dues.create({
        rollno: body.rollno,
        name: body.name,
        prevMonthDues: body.prevMonthDues,
        messBill: body.messBill,
        hostelBill: body.hostelBill,
        fine: body.fine,
        fine_wea: body.fine_wea,
        payment: body.payment,
        misscellaneous: body.misscellaneous,
        misscellaneousReason: body.misscellaneousReason,
        currentMonthDues: body.currentMonthDues,
        dues: body.dues,
        remark:body.remark,
    });
}else{
    const data = await hostelAdmin.update({
        name: body.name,
        prevMonthDues: body.prevMonthDues,
        messBill: body.messBill,
        hostelBill: body.hostelBill,
        fine: body.fine,
        fine_wea: body.fine_wea,
        payment: body.payment,
        misscellaneous: body.misscellaneous,
        misscellaneousReason: body.misscellaneousReason,
        currentMonthDues: body.currentMonthDues,
        dues: body.dues,
        remark:body.remark,
    },
    { where: { rollno: body.rollno } });
}
}
res.status(200).json({
    err: "Successfully updated",
});
});

const updateDuesByRollno = catchAsync(async (req, res) => {
    const isExist = await dues.findOne({ where: { rollno: req.body.rollno } });
    const body = req.body;
    if(isExist==null){
      const data = await dues.create({
          rollno: body.rollno,
          name: body.name,
          prevMonthDues: body.prevMonthDues,
          messBill: body.messBill,
          hostelBill: body.hostelBill,
          fine: body.fine,
          fine_wea: body.fine_wea,
          payment: body.payment,
          misscellaneous: body.misscellaneous,
          misscellaneousReason: body.misscellaneousReason,
          currentMonthDues: body.currentMonthDues,
          dues: body.dues,
          remark:body.remark,
      });
      res.status(200).json({
        data: data,
      });
  }else{
      const data = await hostelAdmin.update({
          name: body.name,
          prevMonthDues: body.prevMonthDues,
          messBill: body.messBill,
          hostelBill: body.hostelBill,
          fine: body.fine,
          fine_wea: body.fine_wea,
          payment: body.payment,
          misscellaneous: body.misscellaneous,
          misscellaneousReason: body.misscellaneousReason,
          currentMonthDues: body.currentMonthDues,
          dues: body.dues,
          remark:body.remark,
      },
      { where: { rollno: req.body.rollno } });
      if(data[0]) res.status(200).json({message: "successfully updated"});
      else res.status(401).json({err: "something wrong not updated"});
  }
  });

module.exports={
  getDues,
  getDuesByPartialRollno,
  getDuesByRollno,
  updateDues,
  updateDuesByRollno
}