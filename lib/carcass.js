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
        // .
        if (target.prototype) obj.mixable(target.prototype);
        // I organize my mixins into plugins. Each plugin is a factory function
        // that can build and return a mixin function, and the mixin function
        // can be used to modify an object directly.
        target.plugin = function(namespace, title, options) {
            // The plugin must be registered first.
            // TODO: error handling.
            var factory = obj[namespace][title];
            if (factory) {
                factory(options)(this);
            }
            return this;
        };
        // The common mixin, simply merge properties.
        target.mixin = function(source) {
            // TODO: error handling.
            var self = this;
            properties(source).forEach(function(key) {
                defineProp(self, key, descriptor(source, key));
            });
            return this;
        };
        target.mixable = true;
        _.bindAll(target, 'plugin', 'mixin');
    };

};
