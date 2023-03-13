const passport = require("passport");
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const UserSchema = require("../models/user");
const User = mongoose.model("User", UserSchema);

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done) {
      User.findOneByEmail(email, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
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