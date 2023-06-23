// Import Statements
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All The Notes: GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        // Here We Are Trying To Find The Notes On The Basis Of User Id That We Get In req Because Of Middleware fetchuser
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        res.status(500).send("Some Internal Error Ocurred");
    }
})


// ROUTE 2: Add A New Note: POST "/api/notes/addnote" Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


// ROUTE 3: Update An Existing Note: PUT "/api/notes/updatenote" Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {


        // Using Destructuring To get The Following From The req.body
        const { title, description, tag } = req.body;

        // Create A New Note --
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Now Finding The Note To Be Updated And Update It

        // Here We Will Find THe NOte By The Id That We Passed In THe Endpoint Above
        let note = await Note.findById(req.params.id);

        // if Note Is Not Found
        if (!note) { return res.status(404).send("Not Found") }

        // if The User Is Updating The Notes Of Any DIfferent User
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // else THe Note exist and The User Is AUthenticate , so We FInd And Update It
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note })


    } catch (error) {
        res.status(500).send("Some Internal Error Ocurred");
    }

})


// ROUTE 4: Delete An Existing Note: DELETE "/api/notes/deletenote" Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {


        // Using Destructuring To get The Following From The req.body
        const { title, description, tag } = req.body;



        // Now Finding The Note To Be Deleted And Delete It

        // Here We Will Find THe NOte By The Id That We Passed In THe Endpoint Above
        let note = await Note.findById(req.params.id);

        // if Note Is Not Found
        if (!note) { return res.status(404).send("Not Found") }

        // if The User Is Updating The Notes Of Any DIfferent User
        // Allowed Deletion Only If User Own This Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        // else THe Note exist and The User Is AUthenticate , so We FInd And Update It
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note Has Been Deleted", note: note })
    } catch (error) {
        res.status(500).send("Some Internal Error Ocurred");
    }
})


module.exports = router