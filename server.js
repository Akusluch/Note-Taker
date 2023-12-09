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
    res.json(oldNotes);
});

//post requests 
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    oldNotes.push(newNote);

    const allNotes = JSON.stringify(oldNotes, null, 2)

    fs.writeFile('./db/db.json', allNotes, (err) =>
        err
            ? console.error(err)
            : console.log(
                `New note ${newNote.title} has been written to JSON file`
                )
    );

    res.json(allNotes);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
