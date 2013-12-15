var express = require('express');
var app = module.exports = express();

app.post('/post', function(req, res, next) {
    res.send(req.body);
});

app.post('/multipart', function(req, res, next) {
    res.json({
        'field': req.body.field,
        'filename': req.files.file.name
    });
});

app.get('/cookie', function(req, res, next) {
    res.cookie('cookie', 'cookie');
    res.send();
});

app.get('/random-cookie', function(req, res, next) {
    res.json(req.cookies);
});
