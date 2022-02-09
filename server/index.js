const express = require('express');
const app = express();
var mirror = require('browser-terminal-mirror');
const path = require('path');
const rp = require('request-promise');

mirror({
    errorPattern: /Warning:/g //discussed below
});

app.use( express.static( path.join(__dirname, 'HTML', 'css', 'JS')));

app.get('/', (rec, res)=> {
    try {
    res.sendFile('public/index.html', {root: __dirname });
    } catch(e) {
        console.log(500);
        // Error
    }
    });


app.get('/style.css', function(req, res) {
    try {
        res.sendFile('public/style.css', {root: __dirname });
        } catch(e) {
            console.log(501);
            // Error
        }
        });
    
    


app.get('/client.js', function(req, res) {
    try {
        res.sendFile('public/client.js', {root: __dirname });
        } catch(e) {
            console.log(502);
            // Error
        }
        });

app.listen(3001, () => {
    console.log("running on port 3001");
});