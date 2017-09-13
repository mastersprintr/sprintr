import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import logger from "morgan";
import config from "./config"; // this will be the place where configuration is stored
import mongoose from "mongoose";
import waitForPort from "wait-for-port";
import session from "express-session";

import auth from "./passport_auth";
import User from "./models/User.model";

class App {
    constructor() {
        this.waitForDB(config.mongoUrl, config.mongoPort, this.init);
    }

    waitForDB = (mongoUrl, mongoPort, cb) => {
        console.log("Backend: Waiting for mongoDB to initialize....");

        const waitOpts = {
            numRetries: 100,
            retryInterval: 1000
        };

        waitForPort(mongoUrl, mongoPort, waitOpts, (err) => {
            if (err) {
                console.log("Fatal!");
                throw new Error(err);
            }
            console.log("Backend: Connection to db established..");
            cb();
        });
    }

    init = () => {
        // DB initialization
        mongoose.connect(config.mongoUrlWithSprintr); // check for authentication here
        var PORT = 3000;
        var app = express();

        // HTTP backends that does the magic
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(session({secret: "greenpastures", resave: false, saveUninitialized: false}));
        app.use(auth.initialize());
        app.use(auth.session());
        app.use(logger("dev"));
        app.use(express.static(path.join(__dirname, "views")));

        // Routes
        var index = require("./routes/index");

        app.use("/", index);

        app.post("/login", auth.authenticate("local", {failureRedirect: "/login"}), function(req, res) {
            console.log("User " + req.body.username + "has logged in.");
            res.send("ok");
        });

        app.get("/users", this.isLoggedIn, function(req, res) {
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

        let newUser = new User({username: "admin", password: "pass", team: "admin"});
        newUser.save();

        app.listen(PORT, function() {
            console.log("Sprintr is now running on port " + PORT);
        });
    }

    die = () => {
        mongoose.disconnect();
    }

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect("/");
    }
}

export default new App();
