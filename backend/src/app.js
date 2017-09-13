var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan");
//var config = require("./config"); // this will be the place where configuration is stored
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
var session = require("express-session");

var User = require("./models/User.model");
var db = "mongodb://localhost/sprintr";
mongoose.connect(db);

passport.use(new Strategy(function(username, password, cb) {
    User.findOne({"username": username})
        .exec(function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password !== password) { console.log("password does not match"); return cb(null, false); }
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
app.use(session({secret: "greenpastures", resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "views")));

// Routes
var index = require("./routes/index");

app.use("/", index);

app.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), function(req, res) {
    console.log("User " + req.body.username + "has logged in.");
    res.send("ok");
});

app.get("/users", isLoggedIn, function(req, res) {
    User.find()
        .exec(function(err, users) {
            if (!err) { res.json(users); }
        });
});

app.get("/logout", function(req, res) {
    req.logout();
    console.log("logged out");
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect("/");
}

app.listen(PORT, function() {
    console.log("Sprintr is now running on port " + PORT);
});
