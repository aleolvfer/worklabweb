const db = require('../database');

class ExamRepository {
  async create({ code, description, price }) {
    const rows = await db.query(`
    INSERT INTO exams(code, description, price)
    VALUES(?, ?, ?)
    `, [code, description, price ]);
    return rows;
  }

  async find() {
    const rows = await db.query('SELECT * FROM exams;');
    return rows;
  }
}

module.exports = new ExamRepository();