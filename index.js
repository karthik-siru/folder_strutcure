const http = require('http');
const cors = require('cors');
const app = require('./app');
//const config = require('./config/config');

let server;
server = http.createServer({}, app);
server.listen(3000, () => {
  console.info(`--- 🌟  Started --- http://localhost:${3000}`);
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
