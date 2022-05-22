const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Catching uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION 🔥🔥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

console.log('ENVIRONMENT:', process.env.NODE_ENV);

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successful!'));

const { PORT } = process.env;
const hostname = '127.0.0.1';

const server = app.listen(PORT, hostname, () => {
  console.log('App running on Port:', PORT);
});

// errors outside express: unhandled rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION 🔥🔥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
