const student = require("../models/student");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
var crypto = require("crypto");
const { Op } = require("sequelize");

// setup to send mail
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

//register a student  :

exports.registerStudent = async (req, res) => {
  try {
    const { name, rollno, email, pswd, dob, address, phno } = req.body;

    const oldStudent = await student.findOne({ where: { rollno: rollno } });

    var dateMomentObject = moment(dob, "DD/MM/YYYY");
    var dobDateObject = dateMomentObject.toDate();

    var encryptedpswd = await bcrypt.hash(pswd, 8);

    if (oldStudent === null) {
      const newStudent = await student.create({
        name: `${name}`,
        email: email,
        rollno: rollno,
        pswd: encryptedpswd,
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

exports.forgotPassword = async (req, res) => {
  try {
    const { rollno } = req.student.rollno;
    const Student = req.student;

    if (Student === null) {
      res.status(200).json({
        err: `No user found with roll no : ${rollno} `,
      });
    } else {
      const studentEmail = Student.email;
      const studentName = Student.name;
      const password = crypto.randomBytes(5).toString("hex");
      var encryptedPassword = await bcrypt.hash(password, 8);
      await Student.update(
        { rollno: rollno },
        {
          where: {
            pswd: encryptedPassword,
          },
        }
      );

      var mailOptions = {
        from: process.env.MAIL,
        to: studentEmail,
        subject: "Your New Password for Hostels-NITC Website",
        html: `<h1>Hi ${studentName}</h1>
        <h2>Your New Password is </h2><br /><p><b>${password}</b></p><br />
        <p>Please Change the Password once you login into Website .. else You can use the Same </p>
        <p>This is a system generated Email .. pls Don't Reply</p>
        <p>Hostels-Website .NITC </p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({
            message: `Please Login using the New password sent to your mail : ${studentEmail}`,
          });
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      err: "Unable to reset password",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { newPassword, currPassword } = req.body;
    const Student = req.student;

    console.log(newPassword, currPassword, Student);

    const { rollno, email, pswd } = Student;
    if (!bcrypt.compare(pswd, currPassword)) {
      res.status(401).json({
        err: "Check your Current Password",
      });
    } else {
      const newEncryptedPassword = await bcrypt.hash(newPassword, 8);
      await Student.update(
        { rollno: rollno },
        {
          where: {
            pswd: newEncryptedPassword,
          },
        }
      ).then(
        res.status(200).json({
          message: "Password Changed Successfully",
        })
      );
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      err: "Unable to Reset Password",
    });
  }
};

exports.getStudentByRollno = async (req, res) => {
  try {
    const { rollno } = req.body;
    const data = await student.findOne({ where: { rollno: rollno } });
    res.status(200).json({
      message: data,
    });
  } catch (error) {
    res.status(401).json({
      message: "Unable to get student details",
    });
  }
};

exports.getStudentByPartialName = async (req, res) => {
  try {
    const { partialName } = req.body;
    const data = student.findAll({
      where: {
        name: {
          [Op.substring]: partialName,
        },
      },
    });
    res.status(200).json({
      message: data,
    });
  } catch (error) {
    res.status(401).json({
      err: "Unable to get Student Names",
    });
  }
};
