var gzippo = require('gzippo');
var express = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app = express();
 
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // pull information from html in POST
app.use(methodOverride());  // simulate DELETE and PUT
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);