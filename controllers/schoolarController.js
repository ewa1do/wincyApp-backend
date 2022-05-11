const Schoolar = require('../models/schoolarModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllSchoolars = async function (req, res) {
  try {
    const features = new APIFeatures(Schoolar.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const schoolars = await features.query;

    res.status(200).json({
      status: 'success',
      results: schoolars.length,
      data: {
        schoolars,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSchoolar = async function (req, res) {
  try {
    const schoolar = await Schoolar.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        schoolar,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createSchoolar = async function (req, res) {
  try {
    const newSchoolar = await Schoolar.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newSchoolar,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateSchoolar = async function (req, res) {
  try {
    const updateSchoolar = await Schoolar.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        updateSchoolar,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteSchoolar = async function (req, res) {
  try {
    await Schoolar.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
