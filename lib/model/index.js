var carcass = require('carcass');
var EventEmitter = require('events').EventEmitter;

// Model
// ---
// .

// Changes from ..
// * Replaced `Emitter()` with `EventEmitter()`.
// * Use `mixable()`.

/**
 * Module dependencies.
 */

var proto = require('./proto');
var statics = require('./static');

/**
 * Expose `createModel`.
 */

module.exports = createModel;

/**
 * Create a new model constructor with the given `name`.
 * 
 * @param {String} name
 * @return {Function}
 * @api public
 */

function createModel(name) {
    if ('string' != typeof name) throw new TypeError('model name required');

    /**
     * Initialize a new model with the given `attrs`.
     */

    function model(attrs) {
        if (!(this instanceof model)) return new model(attrs);
        attrs = attrs || {};
        this._callbacks = {};
        this.attrs = attrs;
        this.dirty = attrs;
    }

    // .
    carcass.mixable(model);

    // mixin emitte

    // Emitter(model);
    EventEmitter.call(model);
    model.mixin(EventEmitter.prototype);

    // statics

    model.modelName = name;
    model.base = '/' + name.toLowerCase();
    model.attrs = {};
    model.validators = [];
    model.mixin(statics);

    // prototype

    // model.prototype = {};
    model.prototype.model = model;
    model.prototype.mixin(proto);

    return model;
}
