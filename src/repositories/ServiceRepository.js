const db = require('../database');

class ServiceRepository {
  async find(){
    const results = await db.query('SELECT * FROM services');
    return results;
  }

  async create(values) {
    const results = await db.query(`INSERT INTO services(id, patient_id, exam_code) VALUES ?`, [values]);
    return results;
  }
}

module.exports = new ServiceRepository();