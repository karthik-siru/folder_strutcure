const db = require("../../../db");
const { DataTypes } = require("sequelize");

const hostelManager = db.define(
  "hostelManager",
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
    tableName: "hostelManager",
  }
);

const hostelManagerArchives = db.define(
  "hostelManagerArchives",
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
    tableName: "hostelManagerArchives",
  }
);

module.exports = {
  hostelManager,
  hostelManagerArchives
}
