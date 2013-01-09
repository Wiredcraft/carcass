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
    // Requires data; an object.
    instance.put = function(data, callback) {
        debug('saving');
        callback = callback || noop;
        var id = data._id || data.id || _.uniqueId();
        var doc = store[id] = _.clone(data);
        doc._id = id;
        callback(null, doc);
    };

    // Read.
    // Requires data; either an object with an id or just an id.
    instance.get = function(data, callback) {
        debug('reading');
        callback = callback || noop;
        var id = data._id || data.id || data;
        if (!id || !store[id]) return callback(new Error('not found'));
        callback(null, store[id]);
    };

    // Delete.
    // Requires data; either an object with an id or just an id.
    instance.del = function(data, callback) {
        debug('deleting');
        callback = callback || noop;
        var id = data._id || data.id || data;
        if (!id || !store[id]) return callback(new Error('not found'));
        delete store[id];
        callback();
    };
};
