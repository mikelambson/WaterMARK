const express = require('express');
const app = express();

app.get('/', (rec, res)=> {
    res.send("WaterMARK Backend Server Initialized")
});

app.listen(3001, () => {
    console.log("running on port 3001");
});

