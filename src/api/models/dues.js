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
    currMonthCharges: {
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
      type: DataTypes.JSON,
    },
    currMonthDues: {
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
  sourceKey: "hostel",
});

(async () => {
  await db.sync({alter:true});
})();

module.exports = dues;
