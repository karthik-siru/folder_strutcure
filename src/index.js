const http = require('http');
const cors = require('cors');
const app = require('./app');
const config = require('./config/config');
const schedule = require('node-schedule');
const mysql = require('mysql');
const mysqlconnector = mysql.createConnection({
  host:config.mysql_host,
  user: config.user,
  password: config.password,
  database: config.db

})

let server;
mysqlconnector.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
  server = http.createServer({}, app);

  server.listen(config.port, () => {
    console.info(`--- 🌟  Started --- http://localhost:${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
