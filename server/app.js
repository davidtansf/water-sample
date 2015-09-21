var express = require('express');
var db = require('./db');
var router = require('./routes');
var app = express();

module.exports.app = app;

app.set("port", 3000);

app.use("/", router);

app.use(express.static(__dirname + "/../client"));

if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
