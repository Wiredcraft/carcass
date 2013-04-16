var debug = require('debug')('carcass:proto:mixin');

var descriptor = Object.getOwnPropertyDescriptor;
var properties = Object.getOwnPropertyNames;
var defineProp = Object.defineProperty;

module.exports = {
    mixin: mixin
};

/**
 * The common mixin, simply merges properties, by redefining the same properties
 * from the source.
 * 
 * TODO: use require('es5-ext/lib/Object/extend-properties')?
 * 
 * @param source
 * @param options
 * @return {this}
 */
function mixin(source, options) {
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
    // TODO
    // Debug output.
    // debug('merged from %s to %s: %s.', from, to, merged);
    return self;
};
