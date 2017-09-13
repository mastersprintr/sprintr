import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import logger from "morgan"; // not yet used but may be needed in the future
import config from "./config"; // this will be the place where configuration is stored
import passport from "passport";
import { Strategy } from "passport-local";
import mongoose from "mongoose";
import waitForPort from "wait-for-port";

// var User = require("./models/User.model");

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
            if(err) {
                console.log("Fatal!");
                throw new Error(err);
            }
            console.log("Backend: Connection to db established..");
            cb();
        });
    }

    init = () => {
        // DB initialization
        mongoose.connect(config.mongoUrl); // check for authentication here
        var PORT = 3000;
        var app = express();

        // Routes
        // var index = require("./routes/index");
        // Route Usage
        // app.use("/", index);

        app.listen(PORT, function() {
            console.log("Sprintr is now running on port " + PORT);
        });
    }

    die = () => {
        mongoose.disconnect();
    }


    // Passport Initialization
    // passport.use(new Strategy(function(username, password, cb) {
    //     User.findOne({username: username})
    //         .exec(function(err, user) {
    //             if (err) { return cb(err); }
    //             if (!user) { return cb(null, false); }
    //             if (user.password !== password) { return cb(null, false); }
    //             return cb(null, user);
    //         });
    // }));

    // passport.serializeUser(function(user, cb) {
    //     cb(null, user._id);
    // });

    // passport.deserializeUser(function(_id, cb) {
    //     User.findOne({_id: _id})
    //         .exec(function(err, user) {
    //             if (err) { return cb(err); }
    //             cb(null, user);
    //         });
    // });



    // HTTP backends that does the magic
    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended: false}));
    // app.use(cookieParser());
    // app.use(passport.initialize());
    // app.use(passport.session());
    // app.use(logger("dev"));

    // // Routes
    // var index = require("./routes/index");
    // // var api = require('./routes/api');

    // // Register static files
    // app.use(express.static(path.join(__dirname, "views")));

    // // Route Usage
    // // app.use('/api', api) : in-progress

    // app.post("/login", passport.authenticate("local"));


    // app.use("/users", function(req, res) {
    //     User.find()
    //         .exec(function(err, users) {
    //             if (!err) { res.json(users); }
    //         });
    // });
}

export default new App();
