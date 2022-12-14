const db = require("../../../db");
const { DataTypes } = require("sequelize");

const mess = db.define(
  "mess",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    messId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey:true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isVeg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boyCapacity: {
      type: DataTypes.INTEGER,
    },
    girlCapacity: {
      type: DataTypes.INTEGER,
    },
    menu: {
      type: DataTypes.TEXT,
    },
    charges: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps:true,
  },
  {
    tableName: "mess",
  }
);

(async () => {
  await db.sync();
})();

module.exports = mess;
