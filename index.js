// Import Statements
const connectToMongo = require('./db');
const express = require('express')

// Call Function To Connect To MongoDB
connectToMongo();

// Code To Start THe Express Server
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


