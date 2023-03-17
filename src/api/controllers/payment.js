const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { payment } = require("../models/payment");

const getPaymentByRollno = catchAsync(async (req, res) => {
  const data = await payment.findAll({where : {rollno : req.params.rollno}});
  res.status(200).json({
      data: data,
  });
});

const getPaymentById = catchAsync(async (req, res) => {
    const data = await payment.findOne({where: {id: req.params.id}});
    res.status(200).json({
        data: data,
    });
});

const getPayment = catchAsync(async (req, res) => {
    const data = await payment.findAll();
    res.status(200).json({
        data: data,
    });
});

const updatePayment = catchAsync(async (req, res) => {
  for(var i=0; i<req.body.length; i++) {
  const isExist = await payment.findOne({ id: { email: req.body.data[i].id } });
  const body = req.body.data[i];
  if(isExist==null){
    const data = await payment.create({
        id: body.id,
        rollno: body.rollno,
        amount: body.amount,
    });
    const isDuesExist = await dues.findOne({ where: {  rollno: body.rollno } });

    if(isDuesExist==null){
        const duesData = await dues.create({
            rollno: body.rollno,
            name: "",
            prevMonthDues: 0,
            messBill: 0,
            hostelBill: 0,
            fine: 0,
            fine_wea: 0,
            payment: 0,
            misscellaneous: 0,
            misscellaneousReason: "",
            currentMonthDues: 0,
            dues: -body.amount,
            remark:"",
        });
    }else{
        const data = await hostelAdmin.update({
            dues: isDuesExist.dues-body.amount,
        },
        { where: { rollno: body.rollno } });
    }

}
}
res.status(200).json({
    err: "Successfully updated",
});
});

const updatePaymentById = catchAsync(async (req, res) => {
    const isExist = await payment.findOne({ id: { email: req.body.id } });
    const body = req.body.data[i];
    if(isExist==null){
      const data = await payment.create({
          id: body.id,
          rollno: body.rollno,
          amount: body.amount,
    });

    const isDuesExist = await dues.findOne({ where: {  rollno: body.rollno } });

    if(isDuesExist==null){
        const duesData = await dues.create({
            rollno: body.rollno,
            name: "",
            prevMonthDues: 0,
            messBill: 0,
            hostelBill: 0,
            fine: 0,
            fine_wea: 0,
            payment: 0,
            misscellaneous: 0,
            misscellaneousReason: "",
            currentMonthDues: 0,
            dues: -body.amount,
            remark:"",
        });
    }else{
        const duesData = await hostelAdmin.update({
            dues: isDuesExist.dues-body.amount,
        },
        { where: { rollno: body.rollno } });
    }

      res.status(200).json({
        data: data,
      });
    }
    res.status(200).json({
        message: "Already updated Previously",
    });
});

module.exports={
  getPayment,
  getPaymentById,
  getPaymentByRollno,
  updatePayment,
  updatePaymentById
}