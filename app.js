const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const schoolarRouter = require('./routes/schoolarRouter');

const app = express();

console.log('ENVIRONMENT:', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// routes

app.use('/api/v1/schoolars', schoolarRouter);

// handling unhandled routes
app.all('*', (req, res, next) => {
  //  this helps me to create a detailed error
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// and then that detailed error is formatted in the http response using the globalErrorHandler
app.use(globalErrorHandler);

module.exports = app;
