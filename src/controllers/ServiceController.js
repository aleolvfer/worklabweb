const { v4 } = require('uuid');

const ServiceRepository = require('../repositories/ServiceRepository');
const ExamRepository = require('../repositories/ExamRepository');
const PatientRepository = require('../repositories/PatientRepository');
const serviceQueryParser = require('../helpers/serviceQueryParser');

class ServiceController {
  async index(request, response) {
    const services = await ServiceRepository.find();
    const servicesParsed = serviceQueryParser(services);
    response.json(servicesParsed);
  }

  async store(request, response) {
    const { patient_id, exam_code } = request.body;
    const id = v4();
    
    const patientExists = await PatientRepository.findById(patient_id);
    if (!patientExists) {
      return response.status(400).json({ error: 'Patient not exists' });
    }
    
    if (typeof exam_code === 'string') {
      const examExists = await ExamRepository.findByCode(exam_code);
      if (!examExists) {
        return response.status(400).json({ error: 'Exam not exists' });
      }

      const uniqValue = [id, patient_id, exam_code];
      await ServiceRepository.create([uniqValue]);

    } else {
      
      exam_code.map(async (exam) => {
        const examExists = await ExamRepository.findByCode(exam);
        if (!examExists) {
          return response.status(400).json({ error: 'Exam not exists' });
        }
      });
      
      const manyValues = exam_code.map( (exam) => [id, patient_id, exam]);
      await ServiceRepository.create(manyValues);
    }
    
    response.sendStatus(201);
  }
}

module.exports = new ServiceController();