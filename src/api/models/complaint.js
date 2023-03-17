const db = require("../../../db");
const { DataTypes } = require("sequelize");

const complaint = db.define(
  "complaint",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rollno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hostel: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    roomno: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mess: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    typeOfComplaint: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    complaint : {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    tableName: "complaint",
  }
);

(async () => {
  await db.sync({});
})();

module.exports = complaint;