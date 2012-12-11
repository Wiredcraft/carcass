var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var debug = require('debug')('carcass:Core');

var descriptor = Object.getOwnPropertyDescriptor;
var properties = Object.getOwnPropertyNames;
var defineProp = Object.defineProperty;

module.exports = function(obj) {

    // Register every file in a dir plus a namespace.
    obj.register = function(dir, namespace) {
        namespace || (namespace = 'plugins');
        // TODO: validate namespace.
        obj[namespace] || (obj[namespace] = {});
        // .
        dir = path.join(dir, namespace);
        fs.readdirSync(dir).forEach(function(filename) {
            if (!/\.js$/.test(filename)) return;
            var name = path.basename(filename, '.js');
            var filepath = path.join(dir, name);
            function load() {
                // debug('loading %s.', filepath);
                var component = require(filepath);
                component.title || (component.title = name);
                return component;
            }
            obj[namespace].__defineGetter__(name, load);
        });
    };

    // Add some helpers to a target object.
    obj.mixable = function(target) {
        // Carcass itself and anything marked as mixable won't be modified
        // again.
        if (!_.isObject(target) || target.mixable) return;
        // Recursively make the prototypes mixable.
        // TODO: maybe too much and maybe we want to stop at some point.
        if (target.prototype) obj.mixable(target.prototype);
        // The common mixin, simply merge properties, by redefining same
        // properties of the source.
        target.mixin = function(source) {
            // TODO: error handling.
            var self = this;
            properties(source).forEach(function(key) {
                defineProp(self, key, descriptor(source, key));
            });
            return this;
        };
        target.mixable = true;
        _.bindAll(target, 'mixin');
        return target;
    };

};
