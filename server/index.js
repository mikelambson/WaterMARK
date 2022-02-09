const express = require('express');
const app = express();
var mirror = require('browser-terminal-mirror');
const path = require('path');

mirror({
    errorPattern: /Warning:/g //discussed below
});

app.use( express.static( path.join(__dirname, 'HTML', 'css', 'JS')));

app.get('/', (rec, res)=> {
    res.sendFile('public/index.html', {root: __dirname });
    console.log("...page loaded.");
    console.info("Console Info")
});

app.get('/style.css', function(req, res) {
    res.sendFile('public/style.css', {root: __dirname });
    console.log("...CSS loaded.")    
});

app.get('/client.js', function(req, res) {
    res.sendFile('public/client.js', {root: __dirname });
    console.log("...JS loaded.")    
});

app.listen(3001, () => {
    console.log("running on port 3001");
});