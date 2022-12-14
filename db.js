
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Ravindra1712@",
    database: "hostel",
})

module.exports = db;