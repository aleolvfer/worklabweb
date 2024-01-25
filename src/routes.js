const express = require('express');

const ExamController = require('./controllers/ExamController');

const router = express.Router();

router.get('/exams', ExamController.index);
router.post('/exams', ExamController.store);

module.exports = router;