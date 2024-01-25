const express = require('express');

const ExamController = require('./controllers/ExamController');

const router = express.Router();

router.get('/exams', ExamController.index);
router.get('/exams/:code', ExamController.show);
router.post('/exams', ExamController.store);
router.delete('/exams/:code', ExamController.delete);

module.exports = router;