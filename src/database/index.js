var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'root',
  database: 'worklabweb',
});

connection.connect();

exports.query = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
