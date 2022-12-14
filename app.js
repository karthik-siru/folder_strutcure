const express = require('express');
const httpStatus = require('http-status');
//const { jwtStrategy } = require('./config/passport');
const cors = require('cors');
const ApiError = require('./src/api/utils/ApiError');


const app = express();
const router = express.Router();


// enable cors
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// parse json request body
app.use(express.json());

// parse url-encoded request body
//app.use(express.urlencoded({ extended: true }));
//passport.use('jwt', jwtStrategy);


app.get('/', (req, res) => res.send('Welcome'));
app.use('/api', require('./src/api/routes'));

// send back a 404 error for any unknown api routes
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route Not Found'));
});

// convert error to ApiError before sending back to client
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    const apiError = err;
    return res.status(apiError.statusCode).json({
      status: apiError.status,
      message: apiError.message,
    });
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

// handle error
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});




module.exports = app;
