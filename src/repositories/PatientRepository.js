const db = require('../database');

class PatientRepository {
  async find() {
    const results = await db.query('SELECT * FROM patients');
    return results;
  }

  async findById(id) {
    const [results] = await db.query('SELECT * FROM patients WHERE id = ?', [id]);
    return results;
  }

  async findByEmail(email) {
    const [results] = await db.query('SELECT * FROM patients WHERE email = ?', [email]);
    return results;
  }

  async create({ name, email, sex, phone }) {
    const results = await db.query(`
      INSERT INTO patients(id, name, email, sex, phone)
      VALUES(uuid(), ?, ?, ?, ?)
    `, [name, email, sex, phone ]);
    return results;
  }

  async update(id, {
    name, email, sex, phone,
  }) {
    const row = await db.query(`
      UPDATE patients
      SET name = ?, email = ?, sex = ?, phone = ?
      WHERE ID = ?
    `, [name, email, sex, phone, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM patients WHERE id = ?', [id]);
    return deleteOp;
  }

}

module.exports = new PatientRepository();