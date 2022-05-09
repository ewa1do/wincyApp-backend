const express = require('express');
const schoolarController = require('../controllers/schoolarController');

const {
  getAllSchoolars,
  getSchoolar,
  createSchoolar,
  updateSchoolar,
  deleteSchoolar,
} = schoolarController;

const router = express.Router();

router.route('/').get(getAllSchoolars).post(createSchoolar);

router
  .route('/:id')
  .get(getSchoolar)
  .patch(updateSchoolar)
  .delete(deleteSchoolar);

module.exports = router;
