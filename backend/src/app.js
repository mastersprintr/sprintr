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
        var data = require("./routes/data");
        var api = require("./routes/api");

        app.use("/", index);
        app.use("/api", api);
        app.use("/api/data", this.isLoggedIn, data);

        app.post("/login", auth.authenticate("local"), function(req, res) {
            console.log("User " + req.body.username + " has logged in.");
            res.status(200)
            res.send({message: "ok"});
        });

        app.get("/logout", function(req, res) {
            req.logout();
            res.status(200);
            res.send({message: "ok"})
            console.log("logged out");
        });

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
