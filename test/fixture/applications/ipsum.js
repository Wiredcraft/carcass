var express = require('express');
var app = module.exports = express();

app.post('/post', function(req, res) {
    res.send(req.body);
});

app.post('/multipart', function(req, res) {
    res.json({
        'field': req.body.field,
        'filename': req.files.file.name
    });
});

app.get('/cookie', function(req, res) {
    res.cookie('cookie', 'cookie');
    res.send();
});

app.get('/random-cookie', function(req, res) {
    res.json(req.cookies);
});
