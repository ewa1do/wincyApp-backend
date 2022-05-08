const express = require('express');
const schoolarController = require('../controllers/schoolarController');

const { getAllSchoolars } = schoolarController;

const router = express.Router();

router.route('/').get(getAllSchoolars);

module.exports = router;
