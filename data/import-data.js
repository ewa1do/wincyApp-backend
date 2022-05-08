const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Schoolar = require('../models/schoolarModel');

dotenv.config({ path: './config.env' });

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

// Read json file
const schoolars = JSON.parse(
  fs.readFileSync(`${__dirname}/business-data.json`, 'utf-8')
);

// IMPORT DATA INTO DATABASE

const importData = async function () {
  try {
    await Schoolar.create(schoolars);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const deleteData = async function () {
  try {
    await Schoolar.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
