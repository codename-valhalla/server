const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },    
    contact: {
        type: String,
        required: true
    },     
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

UserSchema.statics.findOneByEmail = function(email, cb) {
    return this.findOne({ email: email }, cb);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = UserSchema;