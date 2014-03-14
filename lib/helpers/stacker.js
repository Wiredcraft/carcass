var accessor, extend, stacker;

accessor = require('./accessor');

extend = require('es5-ext/lib/Object/extend');


/**
 * A special accessor, where the value is an array and when you call the
 *   function with a new value it gets pushed to the array. Options can be
 *   overridden.
 *
 * @return {Function} a stacker
 */

module.exports = stacker = function(key, options) {
  if (options == null) {
    options = {};
  }
  return accessor(key, extend({
    getDefault: function() {
      return [];
    },
    pre: function(value) {
      var _ref, _stack;
      _stack = (_ref = this[key]) != null ? _ref : [];
      _stack.push(value);
      return _stack;
    }
  }), options);
};
