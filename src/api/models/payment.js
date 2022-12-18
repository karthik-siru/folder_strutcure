const db = require("../../../db");
const { DataTypes } = require("sequelize");
const student = require("./student");
const { hostel } = require("./hostel");

const payment = db.define("payment", {}, { tableName: "paymentEntry" });
