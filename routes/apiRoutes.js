const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');
const util = require('../helpers/fsUtils');
const notes = require('../db/db.json');

// GET request to get new note data
router.get('/notes', (req, res) => {
  (path.join(__dirname, 'notes')).then((data) => {
    console.log(data);
    res.json(JSON.parse(data))
  });
});

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
    (path.join(__dirname, 'db/db.json'), textString);

    util.writeToFile('db/db.json', newNote);

    // ('notes', textString, (err) => 
    // err ?
    // console.error(err) :
    // console.log(`Review for ${newNote.title} has been written to JSON file`))
    util.readAndAppend(newNote, 'db/db.json');

    // ('db/db.json', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     // Convert string into JSON object
    //     const parsedNotes = JSON.parse(data);

    //     // Add a new review
    //     parsedNotes.push(newNote);
    //   }
    // });

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
