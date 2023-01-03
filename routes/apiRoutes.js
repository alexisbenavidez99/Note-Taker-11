const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');

// GET request to get new note data
router.get('../db/db.json', (req, res) => {
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // POST request to add new note
router.post('../db/db.json', (req, res) => {
    const { title, text } = req.body;
    // If all properties are present, save new note and append to json file
    if (title && text) {
        const newNote = {
            title,
            text,
            noteId: uuid(),
        };
    const textString = JSON.stringify(newNote);
    readAndAppend(newNote, '../db/db.json');
    
    // Write string to json file
    fs.writeFile(`../db/${newNote.title}`, textString, (err) =>
    err
    ? console.error(err)
    : console.log(`Review for ${newNote.title} has been written to JSON file`)) 
    }

    // Obtain existing notes
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
  
          parsedNotes.push(newNote);
  
          // Write updated notes back to the file
          fs.writeFile(
            '../db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated reviews!')
          );
        }
      });
});

module.exports = router;