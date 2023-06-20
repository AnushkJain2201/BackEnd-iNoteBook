// Import Statements
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Defining A New Schema
const notesSchema = new Schema({

    // This user Schema Is Like A Foreign Key That Will Store The ObjectId Of One Of THe Entry Of THe User Model 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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