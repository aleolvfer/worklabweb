const express = require('express');

const ExamController = require('./controllers/ExamController');
const PatientController = require('./controllers/PatientController');
const ServiceController = require('./controllers/ServiceController');

const router = express.Router();

router.get('/exams', ExamController.index);
router.get('/exams/:code', ExamController.show);
router.post('/exams', ExamController.store);
router.delete('/exams/:code', ExamController.delete);

router.get('/patients', PatientController.index);
router.get('/patients/:id', PatientController.show);
router.post('/patients', PatientController.store);
router.put('/patients/:id', PatientController.update);
router.delete('/patients/:id', PatientController.delete);

router.get('/services', ServiceController.index);
router.get('/services/:id', ServiceController.show);
router.post('/services', ServiceController.store);
router.delete('/services/:id', ServiceController.delete);


module.exports = router;