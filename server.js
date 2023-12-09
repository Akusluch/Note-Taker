const express = require('express');
const path = require('path');
const fs = require('fs');
// notes database = oldNotes
const oldNotes = require('./db/db.json');
const PORT = process.env.PORT || 3301;
const app = express();

//middleware for added functionality
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//get requests
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(oldNotes.slice(1));
});

//post requests 

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
