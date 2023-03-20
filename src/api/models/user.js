const db = require("../../../db");
const { DataTypes } = require("sequelize");

const user = db.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    pswd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
  }
);

(async () => {
  await db.sync({});
})();

module.exports = user;
