var debug = require('debug')('carcass:Core');

var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var register = require('./register');

var descriptor = Object.getOwnPropertyDescriptor;
var properties = Object.getOwnPropertyNames;
var defineProp = Object.defineProperty;

module.exports = function(obj) {
    obj || (obj = {});

    // Register every file in a dir plus a namespace.
    obj.register = register(obj);

    // Add some helpers to a target object.
    obj.mixable = function(target) {
        target || (target = {});
        // Do not override the mixin function, even it is not mine.
        if (!_.isObject(target) || target.mixin) return;
        // Recursively make the prototypes mixable.
        if (target.prototype) obj.mixable(target.prototype);
        // The common mixin, simply merge properties, by redefining same
        // properties of the source.
        target.mixin = function(source, options) {
            options || (options = {});
            var self = this;
            var keys = properties(source);
            var merged = [];
            // Merge.
            // TODO: an option to prevent overriding.
            // TODO: an option to allow merging non-enumerable properties?
            keys.forEach(function(key) {
                if (source.propertyIsEnumerable(key)) {
                    try {
                        defineProp(self, key, descriptor(source, key));
                        merged.push(key);
                    } catch (err) {
                        debug(err);
                    }
                }
            });
            // Debug output.
            var from = source.title || source.name ||
                source.constructor.title || source.constructor.name ||
                (typeof source);
            var to = self.title || self.name || self.constructor.title ||
                self.constructor.name || (typeof self);
            debug('merged from %s to %s: %s.', from, to, merged);
            return self;
        };
        return target;
    };

    return obj;
};
