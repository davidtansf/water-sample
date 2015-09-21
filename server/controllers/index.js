var models = require('../models');

module.exports = {
  data: {
    get: function (req, res) {
      models.data.get(function(data) {
        res.writeHead(200);
        res.end(JSON.stringify({results: data}));
      });

    }
  },

  sample: {
    get: function (req, res) {
      models.sample.get(req.query.id, function(results) {
        res.writeHead(200);
        res.end(JSON.stringify(results[0]));
      });
    }
  },

  factor: {
    get: function (req, res) {
      models.factor.get(req.query.id, function(results) {
        res.writeHead(200);
        res.end(JSON.stringify(results[0]));
      });
    }
  },

  hash: {
    get: function (req, res) {
      models.hash.get(function(results) {
        res.writeHead(200);
        res.end(JSON.stringify(results));
      });
    }
  }
};

