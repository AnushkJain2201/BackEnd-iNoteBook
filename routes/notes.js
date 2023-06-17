// Import Statements
const express = require('express');
const router = express.Router();

// Same As app.get In The index.js
router.get('/', (req , res) => {
    
    // The Response Will Return The obj
    res.json([]);
})

module.exports = router