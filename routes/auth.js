// Import Statements
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Same As app.get In The index.js
// Create A User Using: POST "/api/auth/createuser"
router.post('/createuser', //The Following Array Contains The Validation Methods To Check Every Field OF User Model
[
    body('name', 'Enter A Valid Name').isLength({min: 3}),
    body('email', 'Enter A Valid Email').isEmail(),
    body('password', 'Password Must Be Atleast 5 Characters').isLength({min: 5})
], (req , res) => {
    // The Result Will Contain The Array Of Error If Error Occurred
    const result = validationResult(req);

    // Check If The Result Contains Any Error
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
  

    // This Method Will Create All The Field As Per Our User Schema And Save It To Our Mongo DataBase
    // The Catch Method Here Will Catch The Error If Someone Uses Duplicate Email
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user))
    .catch(err => { //console.log(err);
    res.status(400).json({error: 'This Email Is Already In Use', message: err.message})});

    // The Response Will Return The obj
    // res.json([]);
})

module.exports = router