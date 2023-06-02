const db = require("../../../db");
const { DataTypes } = require("sequelize");
const student = require("./student");
const { mess } = require("./mess");
const { hostel } = require("./hostel");


const messComplaint = db.define(
  "messComplaint",
  {
    complaint: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
);

mess.hasMany(messComplaint, {
  foreignKey: "messId",
  sourceKey: "messId",
});

student.hasMany(messComplaint, {
  foreignKey: "studentId",
  sourceKey: "rollno",
});

const hostelComplaint = db.define(
  "hostelComplaint",
  {
    complaint: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
);

hostel.hasMany(hostelComplaint, {
  foreignKey: "hostelId",
  sourceKey: "hostelId",
});

student.hasMany(hostelComplaint, {
  foreignKey: "studentId",
  sourceKey: "rollno",
});


const anonymousComplaint = db.define(
  "anonymousComplaint",
  {
    complaint: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
);




(async () => {
  await db.sync({});
})();

module.exports = {
  messComplaint,
  hostelComplaint,
  anonymousComplaint
}