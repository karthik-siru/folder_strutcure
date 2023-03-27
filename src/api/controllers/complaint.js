const { messComplaint, hostelComplaint, anonymousComplaint } = require("../models/complaint");


exports.registerMessComplaint = async (req, res) => {
  try {
    const { messId, complt, studentId } =
      req.body;
    console.log(req.body);

    const newComplaint = await messComplaint.create({
      messId: messId,
      studentId: studentId,
      complaint: complt,
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

exports.registerHostelComplaint = async (req, res) => {
  try {
    const { hostelId, complt, studentId} =
      req.body;
    console.log(req.body);

    const newComplaint = await hostelComplaint.create({
      hostelId: hostelId,
      studentId: studentId,
      complaint: complt,
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

exports.registerAnonyComplaint = async (req, res) => {
  try {
    const { complt} =
      req.body;
    console.log(req.body);

    const newComplaint = await anonymousComplaint.create({
      complaint: complt,
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

exports.getMessComplaints = async (req, res) => {
  try {
    const data = await messComplaint.findAll({
      where: { messId: req.params.messId },
    });
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      err: error,
    });
  }
};

exports.getHostelComplaints = async (req, res) => {
  try {
    const data = await hostelComplaint.findAll({
      where: { hostelId: req.params.hostelId },
    });
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      err: error,
    });
  }
};

exports.getAnonyComplaints = async (req, res) => {
  try {
    const data = await anonymousComplaint.findAll();
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      err: error,
    });
  }
};
