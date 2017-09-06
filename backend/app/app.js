var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan"); // not yet used but may be needed in the future
//var config = require("./config"); // this will be the place where configuration is stored
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
var mongoose = require("mongoose");

// DB initialization
var User = require("./models/User.model");
var db = "mongodb://localhost/sprintr";

mongoose.connect(db); // check for authentication here

// Passport Initialization
passport.use(new Strategy(function(username, password, cb) {
    User.findOne({username: username})
        .exec(function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password !== password) { return cb(null, false); }
            return cb(null, user);
        });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function(_id, cb) {
    User.findOne({_id: _id})
        .exec(function(err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
});

var PORT = 3000;
var app = express();

// HTTP backends that does the magic
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));

// Routes
var index = require("./routes/index");
// var api = require('./routes/api');

// Register static files
app.use(express.static(path.join(__dirname, "views")));

// Route Usage
app.use("/", index);
// app.use('/api', api) : in-progress

app.post("/login", passport.authenticate("local"));


app.use("/users", function(req, res) {
    User.find()
        .exec(function(err, users) {
            if (!err) { res.json(users); }
        });
});

app.listen(PORT, function() {
    console.log("Sprintr is now running on port " + PORT);
});
