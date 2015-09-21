var db = require('../db');

module.exports = {
  data: {
    get: function(callback){
      db.query('SELECT * FROM water_samples', function(err, rows, fields) {
        callback(rows);
      });
    }
  },

  sample: {
    get: function (id, callback) {
      db.query('SELECT * FROM water_samples WHERE id = ?', [id], function(err, rows, fields){
        callback(rows);
      });
    }
  },

  factor: {
    get: function (id, callback) {
      db.query('SELECT * FROM factor_weights WHERE id = ?', [id], function(err, rows, fields){
        callback(rows);
      });
    }
  },

  hash: {
    get: function (callback) {
      db.query('SELECT * FROM factor_weights', function(err, rows, fields){
        callback(rows);
      });
    }
  }
};

