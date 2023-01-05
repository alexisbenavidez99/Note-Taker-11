const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');
const util = require('../helpers/fsUtils');

// GET request to get new note data
router.get('/notes', (req, res) => {
  util.readFromFile(path.join(__dirname, '../db/db.json')).then((data) => {
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  })
});

// POST request to add new note
router.post('/notes', (req, res) => {
  const {
    title,
    text
  } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      noteId: uuid(),
    };
    const textString = JSON.stringify(newNote);
    (path.join(__dirname, 'db/db.json'), textString);

    util.readAndAppend(newNote, 'db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
 });

// DELETE request to delete notes
router.delete('/notes/:noteId', (req, res) => {
  console.log(req.params.noteId);
  let db = JSON.parse(util.readFromFile('db/db.json'))
  let deleteNote = db.filter(item => item.noteId !== req.params.noteId);
  util.writeToFile('db/db.json', JSON.stringify(deleteNote));
  res.json(deleteNote);
});
module.exports = router;
