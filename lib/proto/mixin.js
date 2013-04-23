var debug = require('debug')('carcass:proto:mixin');

var descriptor = Object.getOwnPropertyDescriptor;
var properties = Object.getOwnPropertyNames;
var defineProp = Object.defineProperty;

/**
 * The common mixin, simply merges properties, by redefining the same properties
 * from the source.
 * 
 * I use this function to merge the other protos, so export this directly.
 * 
 * @param source
 * @param options
 * @return {this}
 */
module.exports = function mixin(source, options) {
    options = options || {};
    var self = this;
    try {
        var keys = properties(source);
        // Merge.
        // TODO: optionally prevent overriding?
        // TODO: optionally merge non-enumerable properties?
        keys.forEach(function(key) {
            if (source.propertyIsEnumerable(key)) {
                defineProp(self, key, descriptor(source, key));
            }
        });
    } catch (err) {
        debug(err);
        // TODO: optionally throw errors.
    }
    return self;
};
