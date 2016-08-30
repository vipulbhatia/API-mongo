var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var findhost = require('./routes/findhost');
var portal = require('./routes/portal');
var app = express();
var mongoose =require('mongoose');
var morgan = require('morgan');

mongoose.connect('mongodb://localhost/monitoring');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/findhost', findhost);
app.use('/portal', portal);

app.use((err, req, res, next)=> {
  // handles err being a string (just message) or an object
  if (err instanceof Error || err.message) {
    return respond(err.code || 500, err.message, err.stack);
  }
  if (Array.isArray(err)) {
    return respond(err[0] || err[1]);
  }
  if ('string' === typeof err) {
    return respond(500, err);
  }
  function respond(code, message, stack) {
    console.error(stack || message || code);
    return res.status(code).send(message);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});