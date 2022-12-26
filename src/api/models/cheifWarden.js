const db = require("../../../db");
const { DataTypes } = require("sequelize");
  
const cheifWardenArchives = db.define(
    "cheifWardenArchives",
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
      department: {
        type: DataTypes.STRING,
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
      tableName: "cheifWardenArchives",
    }
);
  
module.exports= {
  cheifWardenArchives
} 