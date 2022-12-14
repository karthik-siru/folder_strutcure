
const mysql = require('mysql');

const db = mysql.createPool({
    host: "sql6.freesqldatabase.com",
    user: "sql6584592",
    password: "Wr6mbapLju",
    database: "sql6584592",
})

module.exports = db;