const db = require("../../../db");
const { DataTypes } = require("sequelize");

  const hostelOfficeAdminArchives = db.define(
    "hostelOfficeAdminArchives",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      phno: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      fromDate:{
        type: DataTypes.DATEONLY,
      },
      toDate:{
        type: DataTypes.DATEONLY,
      }
    },
    {
      timestamps:false,
    },
    {
      tableName: "hostelOfficeAdminArchives",
    }
  );

module.exports = {
    hostelOfficeAdminArchives
}
  