const db = require("../../../db");
const { DataTypes } = require("sequelize");

const preferences = db.define(
  "preferences",
  {
    rollno: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pref1: {
      type: DataTypes.INTEGER,
    },
    pref2: {
      type: DataTypes.INTEGER,
    },
    pref3: {
      type: DataTypes.INTEGER,
    },
    isVeg: {
      type: DataTypes.BOOLEAN,
    },
    gen: {
      type: DataTypes.BOOLEAN,
    },
    isAlloted: {
      type: DataTypes.BOOLEAN,
    },
  },
  { timestamps: true },
  {
    tableName: "Preferences",
  }
);

(async () => {
  await db.sync();
})();

module.exports = { preferences };
