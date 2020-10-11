const express = require("express");
const fs = require("fs");
const path = require("path");
let db = require(__dirname, "Develop/db/db,json");


var app = express();

var PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Develop/public"));

// view routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"))
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"))
});

//api routes
app.get("/api/notes", function(req, res) {
    fs.readFile(__dirname, "Develop/db/db.json", (err, data) => {
        let noteList = JSON.parse(data)
        res.json(noteList)
    })
});

app.post("/api/notes", function(req, res) {
    fs.readFile(__dirname, "Develop/db/db.json", (err, data) => {
        if (err)
        throw (err);
        let noteList = JSON.parse(data);
        let addNote = req.body
        addNote.id = Math.floor(Date.now() * Math.random())
        noteList.push(addNote)

        fs.writeFile(__dirname, "Develop/db/db.json", JSON.stringify(addNote), (err, data) => {
            if (err)
            throw (err)
            res.json(addNote)
        })
    });
    
})

app.delete("/api/notes/:id", function(req, res) {
    res.json(db)
})

app.listen(PORT, () => {
    console.log("Application is listening on PORT " + PORT);
})

