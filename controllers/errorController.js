const AppError = require('../utils/appError');

// handling invalid database IDS
const handleCastErrorsDB = function (err) {
  console.log(err);

  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// handling duplicate database fields
const handleDuplicateFieldsDB = function (err) {
  const [field, value] = Object.entries(err.keyValue).flat();
  const message = `Duplicate field value: (${value}), Please use another value for the field: ${field}`;
  return new AppError(message, 400);
};

// handling mongoose validation errors
const handleValidationErrorDB = err => {
  const values = Object.values(err.errors).map(el => el.message);
  console.log(values, 'validation error');

  const message = `Invalid input data. ${values.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = function (err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = function (err, res) {
  if (err.isOperational) {
    //operational: send error details to the client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other error, don't leak details
  } else {
    console.log(`ERROR 🔥🔥: ${err.name} `);

    res.status(500).json({
      status: 'Error',
      message: 'Something went wrong!',
    });
  }
};

// Global error handling middleware
module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    // console.log('========ERROR========', error);

    if (err.name === 'CastError') error = handleCastErrorsDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.message === 'Validation failed')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
