var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var debug = require('debug')('carcass:Index');

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
            function load() {
                var component = require(path.join(dir, name));
                component.title || (component.title = name);
                return component;
            }
            obj[namespace].__defineGetter__(name, load);
        });
    };

    // Add some helpers to a target object.
    obj.mixable = function(target) {
        if (!_.isObject(target)) return;
        // I organize my mixins into plugins. Each a plugin is a factory
        // function. Once invoked, the factory will return the mixin function,
        // and the mixin function can be used to modify an object directly.
        target.plugin = function(namespace, title, options) {
            var factory = obj[namespace][title];
            if (factory) {
                factory(options)(this);
            }
            return this;
        };
        // The common mixin, simply merge properties.
        target.mixin = function(source) {
            var self = this;
            properties(source).forEach(function(key) {
                defineProp(self, key, descriptor(source, key));
            });
            return this;
        };
        _.bindAll(target, 'plugin', 'mixin');
    };

};
