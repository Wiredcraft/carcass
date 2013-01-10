var debug = require('debug')('carcass:Storage:Memory');

var carcass = require('carcass');
var _ = require('underscore');

var noop = function() {};

// Memory
// ---
// Notes:
// * `_id` is only generated when `id` is not present.
// * `_id` is never saved with the doc.

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
            store[id] = _.clone(data);
            if (!data.id) data._id = id;
            callback(null, data);
        });
    };

    // Read.
    instance.get = function(data, callback) {
        debug('reading');
        callback = callback || noop;
        instance.getId(data, function(id) {
            if (!id || !store[id]) return callback(new Error('not found'));
            var doc = _.clone(store[id]);
            if (!doc.id) doc._id = id;
            callback(null, doc);
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
