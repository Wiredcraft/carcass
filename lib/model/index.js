var carcass = require('carcass');
var EventEmitter = require('events').EventEmitter;

// Model
// ---
// Everything copied from "component/model", with some changes. I copied it
// because it's frontend only.
// TODO: use it once it's ready for node.

// @see https://github.com/component/model

// Changed from original.
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

    EventEmitter.call(model.prototype);
    model.prototype.mixin(EventEmitter.prototype);

    // model.prototype = {};
    model.prototype.model = model;
    model.prototype.mixin(proto);

    return model;
}
