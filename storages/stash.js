var debug = require('debug')('carcass:Storage:Stash');

var carcass = require('carcass');
var _ = require('underscore');
var fs = require('fs');

var noop = function(err) {
    if (err) debug(err);
};
var machineName = carcass.utils.machineName;

// Stash
// ---
// @see https://github.com/developmentseed/stash

// Requires:
// * stash (npm install stash)
// * mkdirp (npm install mkdirp)

// Notes:
// * `_id` is used to represent the filename.
// * `_id` is generated if not given.
// * `_id` is never saved with the doc.

module.exports = carcass.factories.Storage({
    title: 'Stash',
    cache: 'stash',
    initialize: initialize
});

function initialize(instance, options) {
    // Requires id, which is used as the file path.
    // TODO: if (!instance.id) {}
    var stashPath = instance.id;

    debug('initializing %s', stashPath);

    // A reference.
    instance.__defineGetter__('stash', function() {
        return require('stash')(stashPath);
    });

    // Create or Update.
    // Requires data; an object.
    instance.put = function(data, callback) {
        debug('saving');
        callback = callback || noop;
        instance.getId(data, function(id) {
            id = id || 'stash';
            machineName(id).then(function(_id) {
                var doc = _.clone(data);
                if (doc._id) delete doc._id;
                instance.stash.set(_id, doc, function(err) {
                    if (err) return callback(err);
                    instance.get(_id, callback);
                });
            }, callback);
        });
    };

    // Read.
    // Requires data; either an object with an id or just an id.
    instance.get = function(data, callback) {
        debug('reading');
        callback = callback || noop;
        instance.getId(data, function(id) {
            id = id || 'stash';
            machineName(id).then(function(_id) {
                var doc = instance.stash.get(_id);
                if (!doc) return callback(new Error('not found'));
                doc._id = _id;
                callback(null, doc);
            }, callback);
        });
    };

    // Delete.
    // Requires data; either an object with an id or just an id.
    instance.del = function(data, callback) {
        debug('deleting');
        callback = callback || noop;
        instance.get(data, function(err, doc) {
            if (err) return callback(err);
            instance.stash.rm(doc._id, callback);
        });
    };

    // Install.
    instance.install = function(callback) {
        require('mkdirp')(stashPath, callback || noop);
    };

    // Uninstall.
    instance.uninstall = function(callback) {
        fs.rmdir(stashPath, callback || noop);
    };
};
