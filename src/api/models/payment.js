const db = require("../../../db");
const { DataTypes } = require("sequelize");
const student = require("./student");

const payment = db.define(
"payment",
{
    id: {
        type: DataTypes.STRING,
        allowNull: false,
      unique: true,
      primaryKey: true,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
}, { tableName: "payment" });

student.hasMany(payment, {
    foreignKey: "rollno",
    sourceKey: "rollno",
});

(async () => {
    await db.sync();
  })();
  
  module.exports = payment;
