// var debug = require('debug')('carcass:helper:mixin');

var descriptor = Object.getOwnPropertyDescriptor;
var properties = Object.getOwnPropertyNames;
var defineProp = Object.defineProperty;

/**
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 * @param {Object|null} options
 *
 * @return {this}
 */
module.exports = function mixin(source, options) {
    options = options || {};
    var keys = properties(source);
    // Merge.
    // TODO: optionally prevent overriding?
    // TODO: optionally merge non-enumerable properties?
    keys.reduce(function(target, key) {
        if (!source.propertyIsEnumerable(key)) return target;
        return defineProp(target, key, descriptor(source, key));
    }, this);
    return this;
};
