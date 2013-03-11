var debug = require('debug')('carcass:Register');

var path = require('path');
var fs = require('fs');

module.exports = function(obj) {
    obj = obj || {};

    // Register every file in a dir plus a namespace.
    function register(dir, namespace) {
        // TODO: validate namespace.
        namespace || (namespace = 'plugins');
        obj[namespace] || (obj[namespace] = {});
        dir = path.join(dir, namespace);
        // TODO: dir is a dir.
        fs.readdirSync(dir).forEach(function(filename) {
            if (!/\.js$/.test(filename)) return;
            // actuall filename with extension name removed
            var name = path.basename(filename, '.js');
            
            // directory name plus real file name without extension name
            var title = path.join(namespace, name);
            
            // combine current directory with filename
            var filepath = path.join(dir, filename);
            function load() {
                // TODO: error handling.
                // require.cache is an object.
                // Modules are cached in this object when they are required. 
                // if filepath is not cached in the require.cache object then load it.
                if (!require.cache[filepath]) debug('loading %s.', filepath);

                // componnent here is a string indicate right to the original path name plus its file name
                var component = require(filepath);
                component.title || (component.title = title);
                return component;
            }
            obj[namespace].__defineGetter__(name, load);
        });
    };

    return register;
};
