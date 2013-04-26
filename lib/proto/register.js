var debug = require('debug')('carcass:proto:register');

var slice = Array.prototype.slice;
var isObject = require('es5-ext/lib/Object/is-object');
var path = require('path');
var fs = require('fs');

module.exports = {
    register: register
};

/**
 * ...
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
    walk(leaf, dir);
    return self;
};

/**
 * ...
 * 
 * TODO: optionally not 'recursive'?
 * 
 * @param leaf
 * @param dir
 */
function walk(leaf, dir) {
    // TODO: make this an option.
    var ext = '.js';
    try {
        fs.readdirSync(dir).forEach(function(filename) {
            var filepath = path.resolve(dir, filename);
            if (path.extname(filename) === ext) {
                _reg(leaf, path.basename(filename, ext), filepath);
            } else if (fs.statSync(filepath).isDirectory()) {
                if (!isObject(leaf[filename])) leaf[filename] = {};
                walk(leaf[filename], filepath);
            }
        });
    } catch (e) {
        debug(e);
    }
}

/**
 * ...
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
