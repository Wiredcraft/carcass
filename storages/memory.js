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
    instance.put = function(data, callback) {
        debug('saving');
        callback = callback || noop;
        instance.getId(data, function(id) {
            id = id || _.uniqueId();
            var doc = store[id] = _.clone(data);
            doc._id = id;
            callback(null, doc);
        });
    };

    // Read.
    instance.get = function(data, callback) {
        debug('reading');
        callback = callback || noop;
        instance.getId(data, function(id) {
            if (!id || !store[id]) return callback(new Error('not found'));
            callback(null, store[id]);
        });
    };

    // Delete.
    instance.del = function(data, callback) {
        debug('deleting');
        callback = callback || noop;
        instance.getId(data, function(id) {
            if (!id || !store[id]) return callback(new Error('not found'));
            delete store[id];
            callback();
        });
    };
};
