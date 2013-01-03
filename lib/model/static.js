var carcass = require('carcass');

// Model
// ---
// .

// Changes from ..
// * Removed `superagent` and `collection`.
// * Removed `url()`.
// TODO:
// * Rebuild `removeAll()`, `all()`, `get()`, `error()`.

/**
 * Module dependencies.
 */

var noop = function() {};

/**
 * Add validation `fn()`.
 */

exports.validate = function(fn) {
    this.validators.push(fn);
    return this;
};

/**
 * Use the given plugin `fn()`.
 */

exports.use = function(fn) {
    fn(this);
    return this;
};

/**
 * Define attr with the given `name` and `options`.
 */

exports.attr = function(name, options) {
    this.attrs[name] = options || {};

    // implied pk
    if ('_id' == name || 'id' == name) {
        this.attrs[name].primaryKey = true;
        this.primaryKey = name;
    }

    // getter / setter method
    this.prototype[name] = function(val) {
        if (0 == arguments.length) return this.attrs[name];
        var prev = this.attrs[name];
        this.dirty[name] = val;
        this.attrs[name] = val;
        this.model.emit('change', this, name, val, prev);
        this.model.emit('change ' + name, this, val, prev);
        this.emit('change', name, val, prev);
        this.emit('change ' + name, val, prev);
        return this;
    };

    return this;
};

/**
 * Remove all and invoke `fn(err)`.
 */

exports.removeAll = function(fn) {
    fn = fn || noop;
    var self = this;
    var url = this.url('all');
    request.del(url, function(res) {
        if (res.error) return fn(error(res));
        fn();
    });
};

/**
 * Get all and invoke `fn(err, array)`.
 */

exports.all = function(fn) {
    var self = this;
    var url = this.url('all');
    request.get(url, function(res) {
        if (res.error) return fn(error(res));
        var col = new Collection;
        for ( var i = 0, len = res.body.length; i < len; ++i) {
            col.push(new self(res.body[i]));
        }
        fn(null, col);
    });
};

/**
 * Get `id` and invoke `fn(err, model)`.
 */

exports.get = function(id, fn) {
    var self = this;
    var url = this.url(id);
    request.get(url, function(res) {
        if (res.error) return fn(error(res));
        var model = new self(res.body);
        fn(null, model);
    });
};

/**
 * Response error helper.
 */

function error(res) {
    return new Error('got ' + res.status + ' response');
}
