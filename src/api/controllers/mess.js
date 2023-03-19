const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  mess,
  messAdmin,
  messAdminArchives,
  messUser,
  messReview,
  messAvailability,
} = require("../models/mess");
const { messAdminLogin } = require("./auth");
const bcrypt = require("bcryptjs");
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
const day = date.getDate();
if (day >= 25) {
  if (month == 12) {
    month = 1;
    year += 1;
  } else {
    month += 1;
  }
}

const getMessDetails = catchAsync(async (req, res) => {
  const data = await mess.findAll();
  res.status(200).json({
    data: data,
  });
});

const createMess = catchAsync(async (req, res) => {
  const messData = await mess.findOne({ where: { messId: req.body.messId } });
  if (messData == null) {
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
      charges: body.charges,
    });
    res.status(200).json({
      data: data,
    });
  } else {
    res.status(401).json({
      err: "mess with that id already exits",
    });
  }
});

const getMessDetailsByMessId = catchAsync(async (req, res) => {
  const data = await mess.findOne({ where: { messId: req.params.messId } });
  res.status(200).json({
    data: data,
  });
});

const updateMessDetails = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await mess.update(
    {
      name: body.name,
      description: body.description,
      isVeg: body.isVeg,
      capacity: body.capacity,
      boyCapacity: body.boyCapacity,
      girlCapacity: body.girlCapacity,
      menu: body.menu,
      charges: body.charges,
    },
    { where: { messId: body.messId } }
  );
  if (data[0]) res.status(200).json({ message: "successfully updated" });
  else res.status(401).json({ err: "mess with that messId not exists" });
});

const getMessAdmin = catchAsync(async (req, res) => {
  const data = await messAdmin.findAll();
  res.status(200).json({
    data: data,
  });
});

const adminLogin = catchAsync(async (req, res) => {
  const data = await messAdminLogin(req.body.rollno, req.body.pswd);
  res.status(200).json({
    data: data,
  });
});

const getMessAdminByMessId = catchAsync(async (req, res) => {
  const data = await messAdmin.findOne({
    where: { messId: req.params.messId },
  });
  res.status(200).json({
    data: data,
  });
});

const getMessAdminByEmail = catchAsync(async (req, res) => {
  const data = await messAdmin.findOne({
    where: { email: req.body.email },
  });
  data.pswd = undefined;
  res.status(200).json({
    data: data,
  });
});

const createMessAdmin = catchAsync(async (req, res) => {
  const admin = await messAdmin.findOne({ where: { email: req.body.email } });
  if (admin == null) {
    const body = req.body;
    const pswd = await bcrypt.hash(body.pswd, 8);
    const data = await messAdmin.create({
      name: body.name,
      email: body.email,
      pswd: pswd,
      phno: body.phno,
      messId: body.messId,
    });
    res.status(200).json({
      data: data,
    });
  } else {
    res.status(401).json({
      err: "admin with that email already exits",
    });
  }
});

const updateMessAdmin = catchAsync(async (req, res) => {
  const body = req.body;
  const data = await messAdmin.update(
    {
      name: body.name,
      phno: body.phno,
    },
    { where: { email: req.body.email } }
  );
  if (data[0]) res.status(200).json({ message: "successfully updated" });
  else res.status(401).json({ err: "Admin with that email not exists" });
});

const getMessAdminArchives = catchAsync(async (req, res) => {
  const data = await messAdminArchives.findAll();
  res.status(200).json({
    data: data,
  });
});

const getMessAdminArchivesByMessId = catchAsync(async (req, res) => {
  const data = await messAdminArchives.findAll({
    where: { messId: req.params.messId },
  });
  res.status(200).json({
    data: data,
  });
});

const createMessAdminArchives = catchAsync(async (req, res) => {
  const admin = await messAdminArchives.findOne({
    where: { email: req.body.email },
  });
  if (admin == null) {
    const body = req.body;
    const data = await messAdminArchives.create({
      name: body.name,
      email: body.email,
      phno: body.phno,
      messId: body.messId,
      fromDate: body.fromDate,
      toDate: body.toDate,
    });
    res.status(200).json({
      data: data,
    });
  } else {
    res.status(401).json({
      err: "admin with that email already exits",
    });
  }
});

const getMessUser = catchAsync(async (req, res) => {
  const data = await messUser.findAll({
    where: { year: req.params.year, month: req.params.month },
  });
  res.status(200).json({
    data: data,
  });
});

const getMyMess = catchAsync(async (req, res) => {
  const data = await messUser.findOne({
    where: {
      studentId: req.params.studentId,
      year: req.params.year,
      month: req.params.month,
    },
  });
  if (data) {
    res.status(200).json({
      data: data,
    });
  } else {
    res.status(401).json({
      err: "Unable to find student mess details",
    });
  }
});

const getMessUserByStudentId = catchAsync(async (req, res) => {
  const data = await messUser.findAll({
    where: {
      studentId: req.params.studentId,
    },
  });
  res.status(200).json({
    data: data,
  });
});

const getMessUserByMessId = catchAsync(async (req, res) => {
  const data = await messUser.findAll({
    where: {
      messId: req.params.messId,
      year: req.params.year,
      month: req.params.month,
    },
  });
  res.status(200).json({
    data: data,
  });
});

const createMessUser = catchAsync(async (req, res) => {
  const user = await messUser.findOne({
    where: { studentId: req.body.studentId, year: year, month: month },
  });
  if (user == null) {
    const body = req.body;
    const gender = req.body.data.gender;
    const availability = await messAvailability.findAll({
      where: { messId: req.body.messId },
    });
    if (
      gender == "male" &&
      availability.boysCount >= availability.boysCapacity
    ) {
      res.status(401).json({
        err: "Mess capacity exceeded can't allocate",
      });
    }
    if (
      gender == "female" &&
      availability.girlsCount >= availability.girlsCapacity
    ) {
      res.status(401).json({
        err: "Mess capacity exceeded can't allocate",
      });
    }
    const data = await messUser.create({
      messId: body.messId,
      studentId: body.studentId,
      year: year,
      month: month,
    });
    let messAvailablityData;
    if (gender == "male") {
      messAvailablityData = await messAvailability.update(
        {
          boysCount: availability.boysCount + 1,
        },
        { where: { messId: body.messId } }
      );
    }
    if (gender == "female") {
      messAvailablityData = await messAvailability.update(
        {
          girlsCount: availability.girlsCount + 1,
        },
        { where: { messId: body.messId } }
      );
    }
    res.status(200).json({
      data: data,
      message: "successfully Allocated",
    });
  } else {
    res.status(401).json({
      err: "Mess already allocated",
    });
  }
});

const updateMessUser = catchAsync(async (req, res) => {
  const gender = req.body.data.gender;
  if (day < 25) {
    res.status(401).json({
      err: "update not possible",
    });
  }
  const admin = await messUser.findOne({
    where: { studentId: req.body.studentId, year: year, month: month },
  });
  if (!admin) {
    res.status(401).json({
      err: "Mess not allocated",
    });
  } else {
    const availability = await messAvailability.findOne({
      where: { messId: req.body.messId },
    });
    if (
      gender == "male" &&
      availability.boysCount >= availability.boysCapacity
    ) {
      res.status(401).json({
        err: "Mess capacity exceeded can't update",
      });
    }
    if (
      gender == "female" &&
      availability.girlsCount >= availability.girlsCapacity
    ) {
      res.status(401).json({
        err: "Mess capacity exceeded can't update",
      });
    }
    const body = req.body;

    const data = await messUser.update(
      {
        messId: body.messId,
      },
      { where: { studentId: req.body.studentId, year: year, month: month } }
    );
    if (data[0]) {
      let messAvailablityData;
      if (gender == "male") {
        messAvailablityData = await messAvailability.update(
          {
            boysCount: availability.boysCount + 1,
          },
          { where: { messId: body.messId } }
        );
        messAvailablityData = await messAvailability.update(
          {
            boysCount: availability.boysCount - 1,
          },
          { where: { messId: admin.messId } }
        );
      }
      if (gender == "female") {
        messAvailablityData = await messAvailability.update(
          {
            girlsCount: availability.girlsCount + 1,
          },
          { where: { messId: admin.messId } }
        );
      }
      res.status(200).json({ message: "successfully updated" });
    } else res.status(401).json({ err: "not updated" });
  }
});

const createMessReview = catchAsync(async (req, res) => {
  const user = await messReview.findOne({
    where: {
      messId: req.body.messId,
      studentId: req.body.studentId,
      year: req.body.year,
      month: req.body.month,
    },
  });
  if (user == null) {
    const body = req.body;
    console.log(body);
    const data = await messReview.create({
      messId: body.messId,
      studentId: body.studentId,
      year: body.year,
      month: body.month,
      quality: parseInt(body.quality),
      quantity: parseInt(body.quantity),
      taste: parseInt(body.taste),
      catering: parseInt(body.catering),
      hyginess: parseInt(body.hygieness),
      punctuality: parseInt(body.puntuality),
    });
    res.status(200).json({
      data: data,
    });
  } else {
    res.status(401).json({
      err: "Review already done",
    });
  }
});

const checkMessReview = catchAsync(async (req, res) => {
  const user = await messReview.findOne({
    where: {
      studentId: req.body.studentId,
      year: req.body.year,
      month: req.body.month,
    },
  });

  if (user == null) {
    res.status(200).json({
      data: { review: false },
    });
  } else {
    res.status(200).json({
      data: { review: true, rating: user },
    });
  }
});

const getMessReview = catchAsync(async (req, res) => {
  const data = await messReview.findAll();
  res.status(200).json({
    data: data,
  });
});

const getMessReviewByMessId = catchAsync(async (req, res) => {
  const data = await messReview.findAll({
    where: {
      messId: req.params.messId,
      year: req.params.year,
      month: req.params.month,
    },
  });
  let ret = {
    quality: 0,
    quantity: 0,
    taste: 0,
    catering: 0,
    hyginess: 0,
    punctuality: 0,
  };
  for (let i = 0; i < data.length; i++) {
    ret.quality = ret.quality + data[i].quality;
    ret.quantity = ret.quantity + data[i].quantity;
    ret.taste = ret.taste + data[i].taste;
    ret.catering = ret.catering + data[i].catering;
    ret.hyginess = ret.hyginess + data[i].hyginess;
    ret.punctuality = ret.punctuality + data[i].punctuality;
  }
  ret.quality = ret.quality / data.length;
  ret.quantity = ret.quantity / data.length;
  ret.taste = ret.taste / data.length;
  ret.catering = ret.catering / data.length;
  ret.hyginess = ret.hyginess / data.length;
  ret.punctuality = ret.punctuality / data.length;

  res.status(200).json({
    data: ret,
  });
});

const getMessAvailability = catchAsync(async (req, res) => {
  const data = await messAvailability.findAll();

  res.status(200).json({
    data: data,
  });
});

const getMessAvailabilityByMessId = catchAsync(async (req, res) => {
  const data = await messAvailability.findAll();
  res.status(200).json({
    data: data,
  });
});

const previousMessDetails = catchAsync(async (req, res) => {
  const data = await messUser.findOne({
    where: {
      studentId: req.params.studentId,
    },
  });
  if (data) {
    res.status(200).json({
      data: data,
    });
  } else {
    res.status(401).json({
      err: "Unable to find student mess details",
    });
  }
});

const createMessAvailability = async (req, res) => {
  try {
    const { messId, boysCapacity, girlsCapacity } = req.body;

    const data = await messAvailability.create({
      boysCount: 0,
      girlsCount: 0,
      boysCapacity: boysCapacity,
      girlsCapacity: girlsCapacity,
      messId: messId,
    });
    res.status(200).json({
      data: data,
      message: "Successfully created Mess Availability",
    });
  } catch (error) {
    res.status(401).json({
      err: "Unable to Create Mess Availability",
    });
  }
};

module.exports = {
  getMessDetails,
  getMessDetailsByMessId,
  updateMessDetails,
  createMess,
  getMessAdmin,
  createMessAdmin,
  adminLogin,
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
  getMessReviewByMessId,
  checkMessReview,
  createMessAvailability,
  getMessAvailability,
  getMessAvailabilityByMessId,
  getMessUserByStudentId,
  getMessAdminByEmail,
  previousMessDetails,
};
