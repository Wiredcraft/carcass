var debug = require('debug')('carcass:Application:Restify');

var carcass = require('carcass');
var express = require('express');

module.exports = carcass.factories.Express({
    title: 'Restify',
    initialize: function(app, options) {
        debug('initializing');
        app.use(express.bodyParser());
        app.use(express.cookieParser());
    }
});
