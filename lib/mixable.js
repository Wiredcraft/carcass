var debug = require('debug')('carcass:Mixable');

var _ = require('underscore');

var descriptor = Object.getOwnPropertyDescriptor;
var properties = Object.getOwnPropertyNames;
var defineProp = Object.defineProperty;

module.exports = function(obj) {
    obj = obj || {};

    // Add a mixin() function to a target object.
    function mixable(target) {
        target || (target = {});
        // Do not override the mixin function, even it is not mine.
        if (!_.isObject(target) || target.mixin) return;
        // Recursively make the prototypes mixable.
        if (target.prototype) mixable(target.prototype);
        // The common mixin, simply merge properties, by redefining the same
        // properties from the source.
        target.mixin = function(source, options) {
            options || (options = {});
            var self = this;
            var keys = properties(source);
            // Merge.
            // TODO: an option to prevent overriding.
            // TODO: an option to allow merging non-enumerable properties?
            // var merged = [];
            keys.forEach(function(key) {
                if (source.propertyIsEnumerable(key)) {
                    try {
                        defineProp(self, key, descriptor(source, key));
                        // merged.push(key);
                    } catch (err) {
                        debug(err);
                    }
                }
            });
            // TODO
            // Debug output.
            // var from = source.title || source.name ||
            // source.constructor.title || source.constructor.name ||
            // (typeof source);
            // var to = self.title || self.name || self.constructor.title ||
            // self.constructor.name || (typeof self);
            // debug('merged from %s to %s: %s.', from, to, merged);
            return self;
        };
        return target;
    };

    return mixable;
};
