const ExamRepository = require('../repositories/ExamRepository');

class ExamController {
  async index(request, response) {
    const exams = await ExamRepository.find();
    response.json(exams);
  }

  async show(request, response) {
    const { exam_code } = request.params;
    const exam = await ExamRepository.findByCode(exam_code);
    
    if(!exam) {
      return response.status(404).json({ error: 'Exam not find' });
    }

    response.json(exam);
  }
  
  async store(request, response) {
    const { code, description, price } = request.body;

    if (!code || !description || !price) {
      return response.status(400).json({ error: `'code', 'description' and 'price' are required` });
    }

    const examExists = await ExamRepository.findByCode(code);

    if(examExists) {
      return response.status(404).json({ error: 'Exam already exists' });
    }
    
    await ExamRepository.create({ code, description, price });

    response.json(request.body)
  }

  async update(request, response) {
    const { exam_code } = request.params;
    const { code, description, price } = request.body;

    if (!code || !description || !price) {
      return response.status(404).json({ error: `'code', 'description' and 'price' are required` });
    }
    
    const examExists = await ExamRepository.findByCode(exam_code);
    if (!examExists) {
      return response.status(404).json({ error: 'Exam not found' });
    }

    const codeExamExists = await ExamRepository.findByCode(code);
    if (codeExamExists && codeExamExists.code !== exam_code) {
      return response.status(404).json({ error: 'Code Exam alredy exists' });
    }

    await ExamRepository.update(exam_code, { code, description, price });

    response.json(request.body)
  }

  async delete(request, response) {
    const { exam_code } = request.params;

    await ExamRepository.delete(exam_code);

    response.sendStatus(204);
  }
}

module.exports = new ExamController();