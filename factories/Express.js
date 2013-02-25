var debug = require('debug')('carcass:Factory:Express');

var carcass = require('carcass');
var express = carcass.express;
var _ = require('underscore');

// Express
// ---
// Abstract factory; returns a concrete factory.

// Express.js: http://expressjs.com/

// .
module.exports = function(args) {
    debug('building');

    args = args || {};

    // Also support only an initialize function as the argument.
    if (typeof args === 'function') {
        args = {
            initialize: args
        };
    }

    // The concrete factory.
    function builder(options) {
        // Merge options from builder and factory.
        options = _.extend(_.omit(args, 'initialize'), options);

        // Express app.
        var app = express();

        // Invoke initialize function.
        if (args.initialize) {
            args.initialize(app, options);
        }

        return app;
    };

    return builder;
};
