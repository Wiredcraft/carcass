var carcass = require('carcass');
var express = require('express');

module.exports = carcass.factories.Express(function(app, options) {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
});
