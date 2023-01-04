// const router = require('express').Router();
// const fs = require('fs');
// const path = require('path');
// const uuid = require('../helpers/uuid');
// const util = require('util');
// const readFromFile = util.promisify(fs.readFile);
// const readAndAppend = util.promisify(fs.writeFile);

// // GET request to get new note data
// router.get('/notes', (req, res) => {
//     readFromFile(path.join(__dirname, '../db/db.json')).then((data) => res.json(JSON.parse(data)));
//   });

//   // POST request to add new note
// router.post('/notes', (req, res) => {
//     const { title, text } = req.body;
//     // If all properties are present, save new note and append to json file
//     if (title && text) {
//         const newNote = {
//             title,
//             text,
//             noteId: uuid(),
//         };
//     const textString = JSON.stringify(newNote);

//     readAndAppend(path.join(__dirname, '../db/db.json'), textString);
    
//     // Write string to json file
//     readAndAppend(`../db/${newNote.title}`, textString, (err) =>
//     err
//     ? console.error(err)
//     : console.log(`Review for ${newNote.title} has been written to JSON file`)) 
//     }

//     // Obtain existing notes
//     readFromFile('../db/db.json', 'utf8', (err, data) => {
//         if (err) {
//           console.error(err);
//         } else {
//           const parsedNotes = JSON.parse(data);
  
//           parsedNotes.push(newNote);

//           // Write updated notes back to the file
//           readAndAppend(
//             '../db/db.json',
//             JSON.stringify(parsedNotes, null, 4),
//             (writeErr) =>
//               writeErr
//                 ? console.error(writeErr)
//                 : console.info('Successfully updated reviews!')
//           );
//         }
//       });
// });

// module.exports = router;


const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const readAndAppend = util.promisify(fs.writeFile);

// GET Route for retrieving all the feedback
router.get('/notes', (req, res) =>
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
router.post('/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  console.log(req.body);

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, '../db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }

  // Obtain existing notes
  readFromFile('../db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data);

      parsedNotes.push(newNote);

      // Write updated notes back to json file
      readAndAppend('../db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
      writeErr
      ? console.error(writeErr)
      : console.info('Successfully updated notes!'))
    }
  });
});

module.exports = router;