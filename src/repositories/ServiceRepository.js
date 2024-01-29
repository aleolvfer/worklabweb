const db = require('../database');

class ServiceRepository {
  async find(){
    const results = await db.query(`
      SELECT
        services.id AS service_id,
        patients.id AS patient_id,
        patients.name AS patient_name,
        patients.email AS patient_email,
        patients.sex AS patient_sex,
        patients.phone AS phone,
        exams.code AS exam_code,
        exams.description AS exam_description,
        exams.price AS exam_price
      FROM
        services
      JOIN
        patients ON patients.id = services.patient_id
      JOIN
        exams ON services.exam_code = exams.code
    `);
    return results;
  }

  async create(values) {
    const results = await db.query(`INSERT INTO services(id, patient_id, exam_code) VALUES ?`, [values]);
    return results;
  }
}

module.exports = new ServiceRepository();