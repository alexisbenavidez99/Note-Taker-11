const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const readAndAppend = util.promisify(fs.writeFile);
const notes = require('../db/db.json');

// GET request to get new note data
router.get('/notes', (req, res) => {
  readFromFile(path.join(__dirname, 'notes')).then((data) => {
    console.log(data);
    res.json(JSON.parse(data))
  });
});
// have apiroutes and htmlroutes
// create route in json file


// POST request to add new note
router.post('/notes', (req, res) => {

  console.log(req.body);
  const {
    title,
    text
  } = req.body;
  // If all properties are present, save new note and append to json file
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      noteId: uuid(),
    };
    const textString = JSON.stringify(newNote);
    console.log(textString);
    readAndAppend(path.join(__dirname, '../db/db.json'), textString);

    

    fs.writeFile('notes', textString, (err) => 
    err ?
    console.error(err) :
    console.log(`Review for ${newNote.title} has been written to JSON file`))

    // Obtain existing reviews
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          '../db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
 });

module.exports = router;
