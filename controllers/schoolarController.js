const Schoolar = require('../models/schoolarModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsyncErros');

exports.getAllSchoolars = catchAsync(async function (req, res) {
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
});

exports.getSchoolar = catchAsync(async function (req, res) {
  const schoolar = await Schoolar.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      schoolar,
    },
  });
});

exports.createSchoolar = catchAsync(async function (req, res) {
  const newSchoolar = await Schoolar.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newSchoolar,
    },
  });
});

exports.updateSchoolar = catchAsync(async function (req, res) {
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
});

exports.deleteSchoolar = catchAsync(async function (req, res) {
  await Schoolar.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
