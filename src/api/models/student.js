const db = require("../../../db");
const { DataTypes } = require("sequelize");

const student = db.define(
  "student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rollno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    pswd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "student",
  }
);

(async () => {
  await db.sync({});
})();

module.exports = student;
