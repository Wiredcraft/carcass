var express = require('express');
var app = module.exports = express();

app.get('/dolor', function(req, res) {
    res.send('Lorem ipsum dolor sit amet');
});

app.get('/options', function(req, res) {
    res.json('options');
});
