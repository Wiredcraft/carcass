var carcass = require('carcass');
var express = require('express');

var Application = carcass.constructors.Application.extend();

Application.prototype.initialize = function() {
    var app = this;

    app.get('/dolor', function(req, res, next) {
        res.send('Lorem ipsum dolor sit amet');
    });
};

module.exports = Application;
