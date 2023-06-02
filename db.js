const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
const { MYSQL_URL, DBPASSWORD, DBNAME, DBUSER } = process.env;

const db = new Sequelize(DBNAME, DBUSER, DBPASSWORD, {
  host: MYSQL_URL,
  port: 3306,
  logging: console.log,
  dialect: "mysql",
});

const checkDBConnection = async () => {
  try {
    await db.authenticate();
    console.log("Database Connected Successfully ");
  } catch (error) {
    console.log("Database Not Connected", error);
  }
};
checkDBConnection();

// const db = mysql.createPool({
//   host: MYSQL_URL,
//   user: DBUSER,
//   password: PASSWORD,
//   database: DBNAME,
// });

module.exports = db;
