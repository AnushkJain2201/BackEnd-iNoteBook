// Import Statements
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodb$oy";



// Same As app.get In The index.js
// Create A User Using: POST "/api/auth/createuser"
router.post('/createuser', //The Following Array Contains The Validation Methods To Check Every Field OF User Model
    [
        body('name', 'Enter A Valid Name').isLength({ min: 3 }),
        body('email', 'Enter A Valid Email').isEmail(),
        body('password', 'Password Must Be Atleast 5 Characters').isLength({ min: 5 })
    ], async (req, res) => {

        // The Result Will Contain The Array Of Error If Error Occurred
        const result = validationResult(req);

        // Check If The Result Contains Any Error
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        try {

            // This findOne Method Will Find The User With The Same Email If It Exists And Return True
            let user = await User.findOne({ email: req.body.email });

            // If Found True Then Show The Error
            if (user) {
                return res.status(400).json({ error: "Sorry A User With this Email Already Exist" });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password , salt);
            // Else Do This
            // This Method Will Create All The Field As Per Our User Schema And Save It To Our Mongo DataBase
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });

            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data , JWT_SECRET);
            res.json({authtoken});
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some Error Occurred");
        }

        // The Catch Method Here Will Catch The Error If Someone Uses Duplicate Email [old method before async await]
        // .then(user => res.json(user))
        // .catch(err => { //console.log(err);
        // res.status(400).json({error: 'This Email Is Already In Use', message: err.message})});

    })

module.exports = router