const db = require("../../../db");
const { DataTypes } = require("sequelize");

const cheifWarden = db.define(
    "cheifWarden",
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
      phno: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps:true,
    },
    {
      tableName: "cheifWarden",
    }
);

  
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
  cheifWarden,
  cheifWardenArchives
} 