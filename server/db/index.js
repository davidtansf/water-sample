var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "sql123",
  database: "watersample"
});

dbConnection.connect();

module.exports = dbConnection;
