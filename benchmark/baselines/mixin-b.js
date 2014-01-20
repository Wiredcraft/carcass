// var debug = require('debug')('carcass:helper:mixin');

// var descriptor = Object.getOwnPropertyDescriptor;
// var properties = Object.getOwnPropertyNames;
// var defineProp = Object.defineProperty;

/**
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 *
 * @return {this}
 */
module.exports = function mixin(source) {
    // var self = this;
    // try {
    var keys = Object.getOwnPropertyNames(source);
    keys.reduce(function(target, key) {
        if (!source.propertyIsEnumerable(key)) return target;
        var descriptor = Object.getOwnPropertyDescriptor(source, key);
        return Object.defineProperty(target, key, descriptor);
    }, this);
    // } catch (err) {
    //     debug(err);
    // }
    return this;
};
