const ExamRepository = require('../repositories/ExamRepository');

class ExamController {
  async index(request, response) {
    const exams = await ExamRepository.find();
    response.json(exams);
  }
  
  async store(request, response) {
    const {
      code, description, price,
    } = request.body;

    if (!code || !description || !price) {
      return response.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    const exams = await ExamRepository.create({
      code, description, price,
    });

    //response.json(exams);
    response.json(request.body)
  }
}

module.exports = new ExamController();