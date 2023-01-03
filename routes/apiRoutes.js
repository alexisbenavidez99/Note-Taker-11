const router = require('express').Router();
const path = require('path');

// Creating API routes to read json file
router.get('/api/tips', (req, res) => {
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
  });

module.exports = router;