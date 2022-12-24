const db = require("../../../db");
const { DataTypes } = require("sequelize");
 
const hostelAdmin = db.define(
    "hostelAdmin",
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
      pswd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role:{
        type: DataTypes.STRING,
      },
      phno: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      department: {
        type: DataTypes.STRING,
       }
    },
    {
      timestamps:true,
    },
    {
      tableName: "hostelAdmin",
    }
);

module.exports={
    hostelAdmin
}