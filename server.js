// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require('uniqid');
const databasePath = path.join(__dirname, "/db/db.json");
let database = require("./db/db.json");

// Sets up the Express App
const app = express();
const PORT = 3003;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes
// return the `notes.html` file
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

// read the `db.json` file and return all saved notes as JSON
app.get("/api/notes", function(req, res) {
    fs.readFile(databasePath, (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        console.log(notes);
        return res.json(notes);
    })
    // return res.json(database);
});

// receive a new note to save on the request body, add it to the `db.json`
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    // generates a unique id for each note to be used on the delete call
    newNote.id = uniqid();
    database.push(newNote);
    fs.writeFile(databasePath, JSON.stringify(database), (err) => {
        if (err) throw err;
        console.log("New note succefully wrote to the file!");
        res.status(200);
    })
    console.log(newNote);
});

// receive a query parameter containing the id of a note to delete
app.delete("/api/notes/:id", function(req, res) {
    let id = req.params.id;
    fs.readFile(databasePath, (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        console.log("delete", notes);
        notes = notes.filter(note => note.id !==id);
        console.log("filtered", notes);
        database = notes.slice();
        console.log(database);
        fs.writeFile(databasePath, JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log("Note succefully deleted from file!");
            res.status(200);
        });
    });
});

//  return the `index.html` file (* it's like a if statement, has to be last)
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });