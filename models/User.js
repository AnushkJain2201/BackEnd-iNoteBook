// Import Statements
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Defining A New Schema
const userSchema = new Schema({
    name: {
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
});

// Exporting The Model Created Using The Schema Defined Above
const User = mongoose.model('user' , userSchema);
module.exports = User;