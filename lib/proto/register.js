var debug = require('debug')('carcass:proto:register');

var slice = Array.prototype.slice;
var isObject = require('es5-ext/lib/Object/is-object');
var extend = require('es5-ext/lib/Object/extend-properties');
var path = require('path');
var fs = require('fs');

module.exports = {
    register: register
};

/**
 * Register.
 * 
 * See tests for details.
 * 
 * @param root
 * @param *name
 * @return {this}
 */
function register(root) {
    var self = this;
    var leaf = self;
    var dir = path.resolve(root);
    slice.call(arguments, 1).forEach(function(name) {
        if (!isObject(leaf[name])) leaf[name] = {};
        leaf = leaf[name];
        dir = path.resolve(dir, name);
    });
    walk(leaf, dir, isObject(self.registerOptions) ? self.registerOptions : {});
    return self;
}

/**
 * Registers a directory; recursively by default. Sub-directories are omitted if
 * a noRecursive option is given.
 * 
 * @param leaf
 * @param dir
 * @param options
 */
function walk(leaf, dir, options) {
    // TODO: make this an option.
    var ext = '.js';
    var index = null;
    try {
        fs.readdirSync(dir).forEach(function(filename) {
            var filepath = path.resolve(dir, filename);
            if (path.extname(filename) === ext) {
                var name = path.basename(filename, ext);
                if (name === 'index') return index = filepath;
                _reg(leaf, name, filepath);
            } else if (!options.noRecursive &&
                fs.statSync(filepath).isDirectory()) {
                if (!isObject(leaf[filename])) leaf[filename] = {};
                walk(leaf[filename], filepath, options);
            }
        });
        // An index file can be used to override everything.
        if (!options.noIndex && index) {
            extend(leaf, require(index));
        }
    } catch (e) {
        debug(e);
    }
}

/**
 * Defines a getter, which is simply a require(). Returns nothing.
 * 
 * @param leaf
 * @param name
 * @param filepath
 */
function _reg(leaf, name, filepath) {
    leaf.__defineGetter__(name, function() {
        if (!require.cache[filepath]) debug('loading %s.', filepath);
        return require(filepath);
    });
}
