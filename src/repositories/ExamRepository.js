const db = require('../database');

class ExamRepository {
  async find() {
    const results = await db.query('SELECT * FROM exams;');
    return results;
  }
  
  async create({ code, description, price }) {
    const results = await db.query(`
    INSERT INTO exams(code, description, price)
    VALUES(?, ?, ?)
    `, [code, description, price ]);
    return results;
  }

  async findByCode(code) {
    const [results] = await db.query('SELECT * FROM exams WHERE code = ?', [code]);
    return results;
  }

  async update(exam_code, { code, description, price }) {
    const row = await db.query(`
      UPDATE 
        exams
      SET 
        code = ?,
        description = ?,
        price = ?
      WHERE
        code = ?
    `, [code, description, price, exam_code]);

    return row;
  }

  async delete(code) {
    const deleteOp = await db.query('DELETE FROM exams WHERE code = ?', [code]);
    return deleteOp;
  }
}

module.exports = new ExamRepository();