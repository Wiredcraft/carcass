var debug = require('debug')('carcass-auth:Application:Session');

var carcass = require('carcass');
var express = require('express');

// Session
// -------
// Requires cookieParser.
// @see http://www.senchalabs.org/connect/session.html
module.exports = carcass.factories.Express({
    title: 'Session',
    initialize: initialize
});

function initialize(app, options) {
    debug('initializing');

    options = options || {};

    // TODO: fingerprint?
    var session = express.session({
        key: options.key || 'connect.sid',
        store: options.store || new express.session.MemoryStore({
            reapInterval: -1
        }),
        secret: options.secret || 'Lorem ipsum dolor sit amet',
        cookie: options.cookie || {
            path: '/',
            httpOnly: true,
            maxAge: null
        }
    });

    app.use(session);
};
