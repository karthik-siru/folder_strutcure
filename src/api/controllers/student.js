const student = require("../models/student");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
var crypto = require("crypto");
const { Op } = require("sequelize");
const {studentLogin} = require("./auth")
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
        message: "Registration Successfull",
        data: newStudent,
      });
    } else {
      res.status(401).json({
        err: "student with this roll no already exits",
      });
    }
  } catch (error) {
    res.status(401).json({
      err: "unable to register Student",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const data=await studentLogin(req.body.rollno,req.body.pswd);
    res.status(200).json({
      data: data,
    });
  }catch (error){
    res.status(401).json({
      err: "Incorrect Rollno or password",
    });
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const Student = req.student;

    if (Student === null) {
      res.status(200).json({
        err: `No user found with roll no : ${rollno} `,
      });
    } else {
      const rollno = Student.rollno;
      const studentEmail = Student.email;
      const studentName = Student.name;
      const password = crypto.randomBytes(5).toString("hex");
      var encryptedPassword = await bcrypt.hash(password, 8);

      // how to update -> get an instance and then update

      await student.findOne({ where: { rollno: rollno } }).then((record) => {
        if (!record) {
          res.status(200).json({
            err: "No User Found",
          });
        } else {
          record.update({ pswd: encryptedPassword }).then((updatedRecord) => {
            // mail options
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
                  data: updatedRecord,
                });
              }
            });
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      err: "Unable to reset password",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { newPassword, currPassword } = req.body;
    const Student = req.student;
    const { rollno, pswd, name, email } = Student;

    if (await bcrypt.compare(currPassword, pswd)) {
      const newEncryptedPassword = await bcrypt.hash(newPassword, 8);

      await student.findOne({ where: { rollno: rollno } }).then((record) => {
        if (!record) {
          res.status(200).json({
            err: "No User Found",
          });
        } else {
          record
            .update({ pswd: newEncryptedPassword })
            .then((updatedRecord) => {
              // mail options
              var mailOptions = {
                from: process.env.MAIL,
                to: email,
                subject: "Password Changed for Hostels-NITC Website",
                html: `<h1>Hi ${name}</h1>
              <p>Your Password is <b>Changed</b> successfully .</p><br /><br />
              <p>If Not You ... Please Go to Hostels-NITC Website and Forgot Password </p><br/>
              <p> We will send you a new Password to login </p> 
              <p>This is a system generated Email .. pls Don't Reply</p>
              <p>Hostels-Website .NITC </p>`,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                  res.status(200).json({
                    message: `Password Changed Successfully`,
                    data: updatedRecord,
                  });
                }
              });
            });
        }
      });
    } else {
      res.status(401).json({
        err: "Check your Current Password",
      });
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
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      err: "Unable to get student details",
    });
  }
};

exports.getStudentByPartialName = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name)
    const data = student.findAll({
      where: {
        name: {
          [Op.substring]: name,
        },
      },
    });
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      err: "Unable to get Student Names",
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const data = await student.findAll();
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(401).json({
      err: "Unable to fetch all student details",
    });
  }
};
