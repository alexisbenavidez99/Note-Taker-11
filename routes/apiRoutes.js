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

    util.readAndAppend(newNote, 'db/db.json');

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
