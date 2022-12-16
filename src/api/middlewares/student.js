const student = require("../models/student");

exports.getStudentById = async (req, res, next, id) => {
  const data = await student.findOne({ where: { rollno: id } });

  if (data === null) {
    res.status(401).json({
      err: "No user found ",
    });
  } else {
    req.student = data;
    next();
  }
};
