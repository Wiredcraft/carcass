var debug = require('debug')('carcass:deferred');

var deferred = module.exports = require('deferred');

// Extensions
// ---

var callable = require('es5-ext/lib/Object/valid-callable');

// Error listener.
// TODO: comments.
deferred.extend('errorListener', function(cb) {
    callable(cb);
    if (!this.pending) {
        this.pending = [];
    }
    this.pending.push('errorListener', arguments);
    return this;
}, function(cb) {
    if (this.failed) {
        try {
            cb(this.value);
        } catch (e) {}
    }
}, function(cb) {
    callable(cb);
    if (this.failed) {
        try {
            cb(this.value);
        } catch (e) {}
    }
    return this;
});
