// Import Statements
const connectToMongo = require('./db');
const express = require('express')

// Call Function To Connect To MongoDB
connectToMongo();

// Code To Start THe Express Server
const app = express()
const port = 3000

// Available Routes
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


