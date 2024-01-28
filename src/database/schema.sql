CREATE DATABASE worklabweb;

CREATE TABLE IF NOT EXISTS exams (
  code VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (code)
);

CREATE TABLE IF NOT EXISTS patients (
  id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  sex VARCHAR(100),
  phone VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(36) NOT NULL,
  exam_code VARCHAR(255) NOT NULL,
  patient_id VARCHAR(36) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (exam_code) REFERENCES exams (code),
  FOREIGN KEY (patient_id) REFERENCES patients (id) 
);