var carcass = require('carcass');
var express = require('express');

var Application = carcass.constructors.Application.extend();

// A demo application. Adds some middlewares useful for a REST service.
Application.prototype.initialize = function() {
    this.use(express.bodyParser());
    this.use(express.cookieParser());
};

module.exports = Application;
