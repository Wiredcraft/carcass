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
    var self = this;
    // try {
    var keys = Object.getOwnPropertyNames(source);
    keys.forEach(function(key) {
        if (source.propertyIsEnumerable(key)) {
            Object.defineProperty(self, key, Object.getOwnPropertyDescriptor(source, key));
        }
    });
    // } catch (err) {
    //     debug(err);
    // }
    return this;
};
