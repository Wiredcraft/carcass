var debug = require('debug')('carcass:Factory:Express');

var express = require('express');
var _ = require('underscore');

// Express
// ---
// Abstract factory; returns a concrete factory.

// Express.js: http://expressjs.com/

// .
module.exports = function(args) {
    debug('building');

    args = args || {};

    // The concrete factory.
    var builder = function(options) {
        // Merge .
        options = _.extend(_.omit(args, 'initialize'), options);

        // Express app.
        var app = express();

        // Invoke .
        if (args.initialize) {
            args.initialize(app, options);
        }

        return app;
    };

    return builder;
};
