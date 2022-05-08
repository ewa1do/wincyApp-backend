const mongoose = require('mongoose');

const { Schema } = mongoose;

// Creating Schema

const schoolarSchema = new Schema({
  account: String,
  schoolar: String,
  ronin: String,
  status: String,
  energy: Boolean,
  assets: [
    {
      id: String,
      class: String,
      parts: {
        eyes: String,
        ears: String,
        back: String,
        mouth: String,
        horn: String,
        tail: String,
      },
      stats: {
        health: Number,
        speed: Number,
        skill: Number,
        morale: Number,
      },
    },
  ],
});

const Schoolar = mongoose.model('Schoolar', schoolarSchema);

module.exports = Schoolar;
