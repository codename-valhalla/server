const passport = require("passport");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const UserSchema = require("../models/user");
const User = mongoose.model("User", UserSchema);

// POST /users/signup
exports.signup = (req, res, next) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
    });
  
    const password = req.body.password;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      User.findOneByEmail(
        req.body.email
      , (err, existingUser) => {
        if (err) {
          return next(err);
        }
        if (existingUser) {
          return res.status(422).send({
            error: "Email is in use"
          });
        }
        user.save((err) => {
          if (err) {
            return next(err);
          }
          // Automatically log in user after sign up
          req.logIn(user, function(err) {
            if (err) {
              return next(err);
            }
            res.json({
              success: true,
              user
            });
          });
        });
      });
    });
  };

// POST /users/login
exports.login = (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                error: info.message
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json({
                success: true,
                user
            });
            console.log(req.session.passport);
        });        
    })(req, res, next);
};

// GET /users/:id
exports.getUser = (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        res.json({
            user
        });
    });
};

// PUT /users/:id
exports.updateUser = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        res.json({
            user
        });
    });
};

// DELETE /users/:id
exports.deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return next(err);
        }
        res.json({
            success: true
        });
    });
};