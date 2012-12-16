var carcass = require('carcass');
var express = require('express');

var Application = carcass.constructors.Application.extend();

Application.prototype.initialize = function(options) {
    var app = this;

    app.get('/dolor', function(req, res, next) {
        res.send('Lorem ipsum dolor sit amet');
    });

    app.options = options;

    app.get('/options', function(req, res, next) {
        res.json(app.options);
    });
};

module.exports = Application;
