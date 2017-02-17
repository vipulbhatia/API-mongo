var fs = require('fs');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var express = require('express');
var app = express();
var https = require('https').createServer(options, app);
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var findhost = require('./routes/findhost');
var portal = require('./routes/portal');
var login = require('./routes/login');
var users = require('./routes/users');
var mongoose =require('mongoose');
var morgan = require('morgan');
var fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/monitoring');

//app.use(morgan('combined'),{ stream: fs.createWriteStream('./api.log',{flags:'a'})});
//app.use(morgan('combined'));
app.use(morgan('common', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}))
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use('/findhost', findhost);
app.use('/portal', portal);

app.use('/login', login);
app.use('/users', users);

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

https.listen(8083, function () {
  console.log('Example app listening on port 8083');
});
