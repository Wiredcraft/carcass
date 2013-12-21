var express = require('express');
var app = module.exports = express();

app.get('/', function(req, res) {
    res.send('Lorem ipsum dolor sit amet');
});
