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
        target.mixin = function(source, options) {
            options || (options = {});
            var self = this;
            var keys = properties(source);
            // Keep it safe by default.
            if (!options.unsafe) {
                keys = _.difference(keys, blackList(self));
            }
            // Do not override by default.
            if (!options.override) {
                keys = _.difference(keys, properties(self));
            }
            var from = source.title || source.name ||
                source.constructor.title || source.constructor.name ||
                'unknown';
            debug('merging from %s: %s.', from, keys);
            keys.forEach(function(key) {
                try {
                    defineProp(self, key, descriptor(source, key));
                } catch (err) {
                    debug(err);
                }
            });
            return self;
        };
        target.mixable = true;
        return target;
    };
};

// .
var blackLists = {
    'isFunction': _.union(properties(Object), properties(Function)),
    'isArray': _.union(properties(Object), properties(Array)),
    'isObject': properties(Object)
};
function blackList(obj) {
    if (_.isFunction(obj)) return blackLists.isFunction;
    if (_.isArray(obj)) return blackLists.isArray;
    if (_.isObject(obj)) return blackLists.isObject;
    return [];
};
