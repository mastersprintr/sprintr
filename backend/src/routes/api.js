import express from "express";
import mongoose from "mongoose";
var router = express.Router();

import User from "../models/User.model";

router.post("/users", (req, res) => {
            var username = req.body.username; // require on frontend
            var password = req.body.password;
            var team = req.body.team;

            if(username === "" && password === "") {
                res.status(400);
                res.send({message: "Username and Password is empty"});
            }

            //check if user exists first
            User.find({username: username})
                .exec((err, users) => {
                    if(err) {
                        console.log(err);
                        res.status(500)
                        res.send({message: "Something went wrong!"})
                    }

                    if (users.length !== 0) {
                        res.status(403);
                        res.send({"message": `${username} already exists`});
                    } else {
                        let newUser = new User({
                            username: username,
                            password: password,
                            team: team
                        });
                        newUser.save((err) => {
                            res.status(200);
                            res.send({message:"ok"});
                        });
                    }
                });
});

// for testing purposes only. not for production API
router.delete("/users", (req, res) => {
    var username = req.body.username;
    if (username === "") {
        res.send(400);
        res.send({message: "Delete unsuccessful. Empty username field on request body."});
    }

    User.deleteOne({username: username}, (err, result) => {
        console.log(result.deletedCount)
        if(err) {
            res.sendStatus(400);
            res.send({message: "Delete failed. Something is wrong with the database"})
        } else if(result.deletedCount === 1) {
            res.status(200);
            res.send({message:"ok"})
        } else {
            res.status(400);
            res.send({message: "Delete failed. Please check username"});
        }
    });
});

// transfer to protected route
router.get("/users", (req, res) => {
    User.find()
        .exec(function(err, users) {
            if (!err) { res.json(users); }
        });
});

module.exports = router;