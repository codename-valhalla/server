const passport = require("passport");
const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
const UserSchema = require("../models/user");
const User = mongoose.model("User", UserSchema);

if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    require("dotenv").config()
}

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
        facebookId: profile.id
    }, function(err, user) {
        return cb(err, user);
    });
}
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

