const express = require("express");
const fs = require("fs");
const path = require("path");
let db = require(__dirname, "db/db,json");


var app = express();

var PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

// view routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

//api routes

    app.get("/api/notes", function(req, res) {
        // let notes = fs.readFileSync("./db/db.json");
        // let list = JSON.parse(notes);
        // console.log("hello?")
        res.json(db);
    });
    
    app.post("/api/notes", function(req, res) {
            let addNote = req.body;
            addNote.id = Math.floor(Date.now() * Math.random());
            let noteList = fs.readFileSync("./db/db.json");
            let parsedList = JSON.parse(noteList);
            parsedList.push(addNote);
    
            fs.writeFileSync("./db/db.json", JSON.stringify(parsedList), (err) => {
                if (err)
                throw (err)
                res.json(parsedList)
            })
        });
        
    
    
    app.delete("/api/notes/:id", function(req, res) {
        res.json(db)
    })
    



app.listen(PORT, () => {
    console.log("Application is listening on PORT " + PORT);
})

