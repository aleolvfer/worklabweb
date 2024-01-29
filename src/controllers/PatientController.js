const PatientRepository = require('../repositories/PatientRepository');
const patientQueryParser = require('../helpers/patientQueryParser');

class PatientController {
  async index(request, response) {
    const patients = await PatientRepository.find();
    response.json(patients);
  }

  async show(request, response) {
    const { id } = request.params;
    const patient = await PatientRepository.findById(id);

    if(!patient) {
      return response.status(404).json({ error: 'Patient not find' });
    }
    
    const patientParsed = patientQueryParser(patient);

    response.json(patientParsed);
  }
  
  async store(request, response) {
    const { name, email, sex, phone } = request.body;

    if (!name || !email) {
      return response.status(400).json({ error: 'Invalid Arguments' });
    }
    
    const emailExists = await PatientRepository.findByEmail(email);
    if (emailExists) {
      return response.status(400).json({ error: 'Email is alread in use' });
    }

    const patient = await PatientRepository.create({ name, email, sex, phone });
    
    //response.json(patient);
    response.json(request.body)
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, sex, phone } = request.body;

    const patientExists = await PatientRepository.findById(id);
    if (!patientExists) {
      return response.status(404).json({ error: 'Patient not find' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const patientByEmail = await PatientRepository.findByEmail(email);
    if (patientByEmail && patientByEmail.id !== id) {
      return response.status(400).json({ error: 'Email is already in use' });
    }

    const patient = await PatientRepository.update(id, { name, email, sex , phone });

    //response.json(patient);
    response.json(request.body)
  }
  
  async delete(request, response) {
    const { id } = request.params;
    await PatientRepository.delete(id);
    response.sendStatus(204);
  }

}

module.exports = new PatientController()