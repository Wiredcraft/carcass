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
    obj.mixable = function(target) {
        target.mixinPlugin = function(plugin) {
            plugin(this);
            return this;
        };
        target.mixin = function(namespace, title, options) {
            var factory = obj[namespace][title];
            if (factory) {
                this.mixinPlugin(factory(options));
            }
            return this;
        };
        _.bindAll(target, 'mixinPlugin', 'mixin');
    };

};
