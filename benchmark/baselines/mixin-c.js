// var debug = require('debug')('carcass:helper:mixin');

// var descriptor = Object.getOwnPropertyDescriptor;
// var properties = Object.getOwnPropertyNames;
// var defineProp = Object.defineProperty;

var anotherMixin = require('es5-ext/object/mixin');

/**
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 *
 * @return {this}
 */
module.exports = function mixin(source) {
    anotherMixin(this, source);
    return this;
};
