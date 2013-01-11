var debug = require('debug')('carcass:Factory:Storage');

var carcass = require('carcass');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

// .
var cache = {};

// Storage
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

    // .
    var instances = null;
    if (args.cache) {
        instances = cache[args.cache] = cache[args.cache] || {};
    }

    // The concrete factory.
    function builder(options) {
        // Merge options from builder and factory.
        options = _.extend(_.omit(args, 'initialize', 'id'), options);

        // .
        var instance = {
            title: 'Storage'
        };

        // .
        if (instances && options.id) {
            if (instances[options.id]) {
                return instances[options.id];
            }
            instances[options.id] = instance;
        }

        // Mixin.
        carcass.mixable(instance);
        instance.mixin(_.omit(options, 'prototype'));

        // .
        EventEmitter.call(instance);
        instance.mixin(EventEmitter.prototype);

        // TODO: requires CRUD methods.
        // TODO: map variants of method names?

        // Get ID from data.
        // Requires data; either an object with an id or just an id.
        // Returns an id or nothing; doesn't return any error.
        instance.getId = function(data, callback) {
            if (!data) return callback();
            switch (typeof data) {
            case 'object':
                return callback(data._id || data.id);
            case 'number':
                // TODO: convert to string.
            case 'string':
                return callback(data);
            }
            callback();
        };

        // Invoke initialize function.
        if (args.initialize) {
            args.initialize(instance, options);
        }

        return instance;
    };

    return builder;
};
