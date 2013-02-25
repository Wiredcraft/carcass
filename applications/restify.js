var debug = require('debug')('carcass:Application:Restify');

var carcass = require('carcass');
var express = carcass.express;

module.exports = carcass.factories.Express({
    title: 'Restify',
    initialize: initialize
});

function initialize(app, options) {
    debug('initializing');
    app.use(express.bodyParser());
    app.use(express.cookieParser());
};
