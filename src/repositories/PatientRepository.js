const db = require('../database');

class PatientRepository {
  async find() {
    const results = await db.query('SELECT * FROM patients');
    return results;
  }

  async findById(id) {
    const [results] = await db.query(`
    SELECT
      patients.id AS patient_id,
      patients.name AS patient_name,
      patients.email AS patient_email,
      patients.sex AS patient_sex,
      patients.phone AS phone,
      services.id AS service_id,
      exams.code AS exam_code,
      exams.description AS exam_description,
      exams.price AS exam_price
    FROM
      patients
    LEFT JOIN
      services ON patients.id = services.patient_id
    LEFT JOIN
      exams ON services.exam_code = exams.code
    WHERE
      patients.id = ?
    `, [id]);
    return results;
  }

  async findByEmail(email) {
    const [results] = await db.query('SELECT * FROM patients WHERE email = ?', [email]);
    return results;
  }

  async create({ name, email, sex, phone }) {
    const results = await db.query(`
      INSERT INTO 
        patients(id, name, email, sex, phone)
      VALUES
        (uuid(), ?, ?, ?, ?)
    `, [name, email, sex, phone]);
    return results;
  }

  async update(id, {
    name, email, sex, phone,
  }) {
    const row = await db.query(`
      UPDATE 
        patients
      SET 
        name = ?,
        email = ?,
        sex = ?,
        phone = ?
      WHERE
        id = ?
    `, [name, email, sex, phone, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM patients WHERE id = ?', [id]);
    return deleteOp;
  }

}

module.exports = new PatientRepository();