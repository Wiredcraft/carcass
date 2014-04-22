var debug, fs, isObject, mixin, path, slice, walk, _reg,
  __slice = [].slice;

debug = require('debug')('carcass:proto:register');

slice = Array.prototype.slice;

isObject = require('es5-ext/object/is-object');

mixin = require('es5-ext/object/mixin');

path = require('path');

fs = require('fs');

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
    var dir, leaf, name, names, root, _i, _len, _ref;
    root = arguments[0], names = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    leaf = this;
    dir = path.resolve(root);
    for (_i = 0, _len = names.length; _i < _len; _i++) {
      name = names[_i];
      if (!isObject(leaf[name])) {
        leaf[name] = {};
      }
      leaf = leaf[name];
      dir = path.resolve(dir, name);
    }
    walk(leaf, dir, (_ref = this.registerOptions) != null ? _ref : {});
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

walk = function(leaf, dir, options) {
  var e, ext, files, index;
  ext = '.js';
  index = null;
  try {
    files = fs.readdirSync(dir);
  } catch (_error) {
    e = _error;
    debug(e);
  }
  if (files == null) {
    return;
  }
  files.forEach(function(filename) {
    var filepath, name;
    filepath = path.resolve(dir, filename);
    if (path.extname(filename) === ext) {
      name = path.basename(filename, ext);
      if (name === 'index') {
        return index = filepath;
      }
      return _reg(leaf, name, filepath);
    } else if (!options.noRecursive && fs.statSync(filepath).isDirectory()) {
      if (!isObject(leaf[filename])) {
        leaf[filename] = {};
      }
      return walk(leaf[filename], filepath, options);
    }
  });
  if (!options.noIndex && index) {
    return mixin(leaf, require(index));
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
  return Object.defineProperty(leaf, name, {
    configurable: true,
    enumerable: true,
    get: function() {
      if (require.cache[filepath] == null) {
        debug('loading %s.', filepath);
      }
      return require(filepath);
    }
  });
};
