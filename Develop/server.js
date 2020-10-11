const express = require("express");
const fs = require("fs");
const path = require("path");


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
app.get()

app.listen(PORT, () => {
    console.log("Application is listening on PORT " + PORT);
})

