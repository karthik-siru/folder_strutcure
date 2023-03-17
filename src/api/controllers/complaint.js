const complaint = require("../models/complaint");

exports.registerComplaint = async (req, res) => {
  try {
    const { name, rollno, hostel, roomno, mess, typeOfComplaint, cmplnt } =
      req.body;
    console.log(req.body);
    console.log(name);
    console.log(rollno);
    console.log(cmplnt);

    const newComplaint = await complaint.create({
      name: `${name}`,
      rollno: rollno,
      hostel: hostel,
      roomno: roomno,
      mess: mess,
      typeOfComplaint: typeOfComplaint,
      complaint: cmplnt,
    });

    console.log(newComplaint);
    res.status(200).json({
        message: "Registration Successfull",
      });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      err: error,
    });
  }
};
