const student = require("../models/student");
const moment = require("moment");

//register a student  :

exports.registerStudent = async (req, res) => {
  try {
    const { name, rollno, email, pswd, dob, address, phno } = req.body;

    const oldStudent = await student.findOne({ where: { rollno: rollno } });

    var dateMomentObject = moment(dob, "DD/MM/YYYY");
    var dobDateObject = dateMomentObject.toDate();

    if (oldStudent === null) {
      const newStudent = await student.create({
        name: `${name}`,
        email: email,
        rollno: rollno,
        pswd: pswd,
        dob: dobDateObject,
        address: address,
        phno: phno,
      });
      newStudent.pswd = null;
      res.status(200).json({
        student: newStudent,
      });
    } else {
      res.status(401).json({
        message: "student with this roll no already exits",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "unable to register Student",
    });
  }
};
