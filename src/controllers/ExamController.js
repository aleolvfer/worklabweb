const ExamRepository = require('../repositories/ExamRepository');

class ExamController {
  async index(request, response) {
    const exams = await ExamRepository.find();
    response.json(exams);
  }

  async show(request, response) {
    const { code } = request.params;
    const exam = await ExamRepository.findByCode(code);
    
    if(!exam) {
      return response.status(404).json({ error: 'Exam not find' });
    }

    response.json(exam);
  }
  
  async store(request, response) {
    const { code, description, price } = request.body;

    if (!code || !description || !price) {
      return response.status(400).json({ error: 'Invalid Arguments' });
    }

    const examExists = await ExamRepository.findByCode(code);

    if(examExists) {
      return response.status(404).json({ error: 'Exam already exists' });
    }
    
    const exams = await ExamRepository.create({
      code, description, price,
    });

    //response.json(exams);
    response.json(request.body)
  }

  async delete(request, response) {
    const { code } = request.params;

    await ExamRepository.delete(code);

    response.sendStatus(204);
  }
}

module.exports = new ExamController();