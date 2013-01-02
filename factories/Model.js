var debug = require('debug')('carcass:Factory:Model');

var carcass = require('carcass');
var _ = require('underscore');

// .
var createModel = require('../lib/model');

// Model
// ---
// Abstract factory; returns a concrete factory.

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

    // TODO: expose this somewhere?
    var Model = createModel(args.title || _.uniqueId('model_'));

    // TODO: args.schema or args.attrs

    // The concrete factory.
    function builder(attrs, options) {
        attrs = attrs || {};
        options = options || {};

        var model = new Model(attrs);

        // Invoke the initialize function.
        if (args.initialize) {
            args.initialize(model, options);
        }

        return model;
    };

    return builder;
};
