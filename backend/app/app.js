var express = require('express');
var app = express()
// var mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send("Yolo");
});

app.listen(3000);

console.log("Backend running on port 3000");

