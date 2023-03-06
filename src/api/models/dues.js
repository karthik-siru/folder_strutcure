const db = require("../../../db");
const { DataTypes } = require("sequelize");
const student = require("./student");
const { hostel } = require("./hostel");

const dues = db.define(
  "dues",
  {
    name: {
      type: DataTypes.TEXT,
    },
    prevMonthDues: {
      type: DataTypes.INTEGER,
    },
    messBill:{
      type: DataTypes.INTEGER,
    },
    hostelBill:{
      type: DataTypes.INTEGER,
    },
    fine: {
      type: DataTypes.INTEGER,
    },
    fine_wea: {
      type: DataTypes.INTEGER,
    },
    payment: {
      type: DataTypes.INTEGER,
    },
    misscellaneous: {
      type: DataTypes.INTEGER,
    },
    misscellaneousReason: {
      type: DataTypes.TEXT,
    },
    currentMonthDues: {
      type: DataTypes.INTEGER,
    },
    dues:{
      type: DataTypes.INTEGER,
    },
    remark: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "dues",
  }
);

student.hasOne(dues, {
  foreignKey: "rollno",
  sourceKey: "rollno",
});

hostel.hasMany(dues, {
  foreignKey: "hostelId",
  sourceKey: "hostelId",
});

(async () => {
  await db.sync();
})();

module.exports = dues;
