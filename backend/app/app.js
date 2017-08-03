var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan'); // not yet used but may be needed in the future
var config = require('./config'); // this will be the place where configuration is stored

// var mongoose = require('mongoose'); not good enough docu. can we use mongojs or the native mongodb driver instead?

var PORT = 3000;
var app = express();

// HTTP backends that does the magic
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger('dev'));

// Routes
var index = require('./routes/index');
var api = require('./routes/api');

// Register static files
app.use(express.static(path.join(__dirname, 'views')));

// Route Usage
app.use('/', index);
// app.use('/api', api) : in-progress

app.listen(PORT, function() {
    console.log("Sprintr is now running on port " + PORT);
});
