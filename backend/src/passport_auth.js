import passport from "passport";
import {Strategy} from "passport-local";

import User from "./models/User.model";


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

export default passport;
