const db = require('../database');

class ExamRepository {
  async create({ code, description, price }) {
    const results = await db.query(`
    INSERT INTO exams(code, description, price)
    VALUES(?, ?, ?)
    `, [code, description, price ]);
    return results;
  }

  async findByCode(code) {
    const [results] = await db.query('SELECT code FROM exams WHERE code = ?', [code]);
    return results;
  }

  async find() {
    const results = await db.query('SELECT * FROM exams;');
    return results;
  }

  async delete(code) {
    const deleteOp = await db.query('DELETE FROM exams WHERE code = ?', [code]);
    return deleteOp;
  }
}

module.exports = new ExamRepository();