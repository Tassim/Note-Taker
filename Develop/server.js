// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const databasePath = path.join(__dirname, "/db/db.json");
const database = require("./db/db.json");

// Sets up the Express App
const app = express();
const PORT = 3003;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes
//  return the `notes.html` file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// return the `index.html` file
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

// read the `db.json` file and return all saved notes as JSON
app.get("/api/notes", function(req, res) {
    // fs.readFile(databasePath, (err, data) => {
    //     if (err) throw err;
    //     let notes = JSON.parse(data);
    //     console.log(notes);
    // })
    return res.json(database);
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });