var debug = require('debug')('carcass:Storage:Memory');

var carcass = require('carcass');
var _ = require('underscore');

module.exports = carcass.factories.Storage({
    title: 'Memory',
    cache: 'memory',
    initialize: initialize
});

function initialize(instance, options) {
    debug('initializing');

    instance.store = {};

    // Create or Update.
    instance.put = function(data, callback) {
        if (_.isFunction(data)) {
            callback = data;
            data = {};
        }
        // TODO: data needs to be an object.
        var id = data._id || data.id || _.uniqueId();
        this.store[id] = data;
        data._id = id;
        callback(null, data);
    };

    // Read.
    instance.get = function(data, callback) {
        if (_.isFunction(data)) {
            callback = data;
            data = {};
        }
        // Data can be an object or just an id.
        var id = data._id || data.id || data;
        if (id && this.store[id]) {
            callback(null, this.store[id]);
        } else {
            // TODO
            callback(new Error('not found'));
        }
    };

    // Delete.
    instance.del = function(data, callback) {
        if (_.isFunction(data)) {
            callback = data;
            data = {};
        }
        // Data can be an object or just an id.
        var id = data._id || data.id || data;
        if (id && this.store[id]) {
            delete this.store[id];
            callback();
        } else {
            // TODO
            callback(new Error('not found'));
        }
    };
};
