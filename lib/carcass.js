var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var debug = require('debug')('carcass:Index');

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

    // A method that can make something ...
    // TODO: rename to plugin, and build a real mixin.
    obj.mixable = function(target) {
        target.plugin = function(namespace, title, options) {
            var factory = obj[namespace][title];
            if (factory) {
                factory(options)(this);
            }
            return this;
        };
        _.bindAll(target, 'plugin');
    };

};
