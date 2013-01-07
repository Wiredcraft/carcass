var debug = require('debug')('carcass:Storage:Memory');

var carcass = require('carcass');
var _ = require('underscore');

var noop = function() {};

module.exports = carcass.factories.Storage({
    title: 'Memory',
    cache: 'memory',
    initialize: initialize
});

function initialize(instance, options) {
    debug('initializing');

    var store = instance.store = {};

    // Create or Update.
    // Requires data.
    instance.put = function(data, callback) {
        debug('saving');
        callback = callback || noop;
        var id = data._id || data.id || _.uniqueId();
        store[id] = data;
        data._id = id;
        callback(null, data);
    };

    // Read.
    // Requires data.
    instance.get = function(data, callback) {
        debug('reading');
        callback = callback || noop;
        // Data can be an object or just an id.
        var id = data._id || data.id || data;
        if (id && store[id]) {
            callback(null, store[id]);
        } else {
            // TODO
            callback(new Error('not found'));
        }
    };

    // Delete.
    // Requires data.
    instance.del = function(data, callback) {
        debug('deleting');
        callback = callback || noop;
        // Data can be an object or just an id.
        var id = data._id || data.id || data;
        if (id && store[id]) {
            delete store[id];
            callback();
        } else {
            // TODO
            callback(new Error('not found'));
        }
    };
};
