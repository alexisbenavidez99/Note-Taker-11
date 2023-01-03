const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');

// Creating API routes to read json file
router.get('./db/db.json', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

router.post('../db/db.json', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
    const textString = JSON.stringify(newNote);
    readAndAppend(newNote, '../db/db.json');
    
    fs.writeFile(`./db/${newNote.title}`, textString, (err) =>
    err
    ? console.error(err)
    : console.log(`Review for ${newNote.title} has been written to JSON file`)) 
    }
});

module.exports = router;