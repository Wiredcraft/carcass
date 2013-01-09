var debug = require('debug')('carcass:Storage:Stash');

var carcass = require('carcass');
var fs = require('fs');
var mkdirp = require('mkdirp');

var noop = function() {};
var machineName = carcass.utils.machineName;

// Stash
// ---
// Requires:
// * stash (npm install stash)
// * mkdirp (npm install mkdirp)

// .
module.exports = carcass.factories.Storage({
    title: 'Stash',
    cache: 'stash',
    initialize: initialize
});

function initialize(instance, options) {
    debug('initializing');

    // Requires id, which is used as the file path.
    // TODO: if (!instance.id) {}
    var stashPath = instance.id;

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
            machineName(id, function(err, _id) {
                if (err) return callback(err);
                data._id = _id;
                instance.stash.set(_id, data, function(err) {
                    if (err) return callback(err);
                    instance.get(_id, callback);
                });
            });
        });
    };

    // Read.
    // Requires data; either an object with an id or just an id.
    instance.get = function(data, callback) {
        debug('reading');
        callback = callback || noop;
        instance.getId(data, function(id) {
            id = id || 'stash';
            machineName(id, function(err, _id) {
                if (err) return callback(err);
                var _data = instance.stash.get(_id);
                if (!_data) return callback(new Error('not found'));
                _data._id = _id;
                callback(null, _data);
            });
        });
    };

    // Delete.
    // Requires data; either an object with an id or just an id.
    instance.del = function(data, callback) {
        debug('deleting');
        callback = callback || noop;
        instance.get(data, function(err, _data) {
            if (err) return callback(err);
            instance.stash.rm(_data._id, callback);
        });
    };

    // Install.
    instance.install = function(callback) {
        mkdirp(stashPath, callback);
    };

    // Uninstall.
    instance.uninstall = function(callback) {
        fs.rmdir(stashPath, callback);
    };
};
