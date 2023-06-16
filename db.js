// Import Statements
const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017';

// A Function To Connect To MongoDB
const connectToMongo = async() => {
    await mongoose.connect(mongoURI);
    console.log("Connected To Mongo Db Successfully");
}

// Using Common Export Method To Export The Function
module.exports = connectToMongo;