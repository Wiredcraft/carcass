var accessor, debug, fs, isObject, path, walk, _reg,
  __slice = [].slice;

debug = require('debug')('carcass:proto:register');

path = require('path');

fs = require('fs');

isObject = require('es5-ext/object/is-object');

accessor = require('../helpers/accessor');

module.exports = {

  /**
   * Register.
   *
   * See tests for details.
   *
   * @param root
   * @param *name
   * @return {this}
   */
  register: function() {
    var dir, leaf, name, names, root, _i, _j, _len, _name;
    root = arguments[0], names = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), name = arguments[_i++];
    leaf = this;
    dir = path.resolve(root);
    for (_j = 0, _len = names.length; _j < _len; _j++) {
      _name = names[_j];
      if (!isObject(leaf[_name])) {
        leaf[_name] = {};
      }
      leaf = leaf[_name];
      dir = path.resolve(dir, _name);
    }
    if (name == null) {
      name = path.basename(dir, path.extname(dir));
      dir = path.dirname(dir);
    }
    walk(leaf, dir, name);
    return this;
  }
};


/**
 * Registers a directory recursively by default. Sub-directories are omitted if
 * a noRecursive option is given.
 *
 * @param leaf
 * @param dir
 * @param options
 */

walk = function(leaf, dir, name) {
  var filename, files, modPath, subPath, _i, _len, _results;
  subPath = path.resolve(dir, name);
  try {
    modPath = require.resolve(subPath);
  } catch (_error) {}
  if (modPath != null) {
    return _reg(leaf, name, modPath);
  }
  try {
    files = fs.readdirSync(subPath);
  } catch (_error) {}
  if (files != null) {
    if (leaf[name] == null) {
      leaf[name] = {};
    }
    if (!isObject(leaf[name])) {
      return;
    }
    _results = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      filename = files[_i];
      _results.push(walk(leaf[name], subPath, filename));
    }
    return _results;
  }
};


/**
 * Defines a getter, which is simply a require(). Returns nothing.
 *
 * @param leaf
 * @param name
 * @param filepath
 */

_reg = function(leaf, name, filepath) {
  name = path.basename(name, path.extname(name));
  Object.defineProperty(leaf, name, {
    configurable: true,
    enumerable: true,
    get: function() {
      if (require.cache[filepath] == null) {
        debug('loading %s.', filepath);
      }
      return require(filepath);
    }
  });
  return true;
};
