const http = require('http');
const express = require('express');
const path = require('path');
const main = require('./index');

const app = express();

app.use(express.json());
app.use(express.static("express"));

app.use('/', async function(req,res) {
    console.log(req.query.firstInsta);
    res.setHeader('Access-Control-Allow-Origin', '*');
    var result = await main.main(req.query.firstInsta);
    res.json(result);
    //__dirname : It will resolve to your project folder.
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);