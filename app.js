const express = require('express');
const morgan = require('morgan');

const schoolarRouter = require('./routes/schoolarRouter');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// routes

app.use('/api/v1/schoolars', schoolarRouter);

// handling unhandled routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });

  next();
});

module.exports = app;
