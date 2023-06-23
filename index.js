// Import Statements
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

// Call Function To Connect To MongoDB
connectToMongo();

// Code To Start THe Express Server
const app = express()
const port = 5000

// We Have To Use A MiddleWare To Use The req.body
app.use(express.json());


app.use(cors())

// Available Routes
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNoteBook BackEnd listening on port http://localhost:${port}`)
})


