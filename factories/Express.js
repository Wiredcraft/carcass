var debug = require('debug')('carcass:Express');

var express = require('express');
var _ = require('underscore');

// Build an Express app.
module.exports = function(initialize) {
    initialize || (initialize = function() {});
    var instance = function(title, options) {
        if (_.isObject(title)) {
            options = title;
            title = _.uniqueId('_');
        }
        debug('initializing %s.', title);
        var app = express();
        app.set('title', title);
        initialize(app, options);
        return app;
    };
    return instance;
};
