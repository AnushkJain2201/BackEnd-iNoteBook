// Import Statements
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Defining A New Schema
const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// Exporting The Model Created Using The Schema Defined Above
module.exports = mongoose.model('notes' , notesSchema)