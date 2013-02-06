var debug = require('debug')('carcass:Register');

var path = require('path');
var fs = require('fs');

module.exports = function(obj) {
    obj = obj || {};

    function register(dir, namespace) {
        // TODO: validate namespace.
        namespace || (namespace = 'plugins');
        obj[namespace] || (obj[namespace] = {});
        dir = path.join(dir, namespace);
        // TODO: dir is dir.
        fs.readdirSync(dir).forEach(function(filename) {
            if (!/\.js$/.test(filename)) return;
            var name = path.basename(filename, '.js');
            var title = path.join(namespace, name);
            var filepath = path.join(dir, name);
            function load() {
                // TODO: error handling.
                // debug('loading %s.', title);
                var component = require(filepath);
                component.title || (component.title = title);
                return component;
            }
            obj[namespace].__defineGetter__(name, load);
        });
    }

    return register;
};
