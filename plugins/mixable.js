var debug = require('debug')('carcass:Plugin:Mixable');

var _ = require('underscore');

var descriptor = Object.getOwnPropertyDescriptor;
var properties = Object.getOwnPropertyNames;
var defineProp = Object.defineProperty;

// Add a mixin() function to a target object.
module.exports = function mixable(obj) {
    obj = obj || {};

    // Do not override the mixin function, even it is not mine.
    if (!_.isObject(obj) || obj.mixin) return obj;
    // Recursively make the prototypes mixable.
    if (obj.prototype) mixable(obj.prototype);
    // The common mixin, simply merge properties, by redefining the same
    // properties from the source.
    obj.mixin = function(source, options) {
        options = options || {};
        var self = this;
        var keys = properties(source);
        // Merge.
        // TODO: an option to prevent overriding.
        // TODO: an option to allow merging non-enumerable properties?
        keys.forEach(function(key) {
            if (source.propertyIsEnumerable(key)) {
                try {
                    defineProp(self, key, descriptor(source, key));
                } catch (err) {
                    debug(err);
                }
            }
        });
        // TODO
        // Debug output.
        // debug('merged from %s to %s: %s.', from, to, merged);
        return self;
    };
    return obj;
};
