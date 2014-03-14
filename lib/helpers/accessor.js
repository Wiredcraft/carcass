var accessor, validValue;

validValue = require('es5-ext/lib/Object/valid-value');


/**
 * Builds an accessor.
 *
 * @param {String} key
 * @param {Object} options
 *
 * @option options {Function} getDefault: can be used to provide a default
 *   value when there's no value set already.
 * @option options {Function} pre: can be used to do whatever before the value
 *   is set. Note that if it presents, the return value will be used.
 * @option options {Function} post: can be used to do whatever after the value
 *   is set.
 *
 * @return {Function} an accessor
 */

module.exports = accessor = function(key, options) {
  if (options == null) {
    options = {};
  }
  validValue(key);

  /**
   * A simple accessor.
   *
   * Use it with an argument to set a value, and use without any argument to
   *   retrieve the value.
   *
   * @return {value|this} depends on you are getting or setting
   */
  return function(value) {
    if (!arguments.length) {
      if ((this[key] == null) && (options.getDefault != null)) {
        this[key] = options.getDefault.call(this);
      }
      return this[key];
    }
    if (options.pre != null) {
      value = options.pre.apply(this, arguments);
    }
    this[key] = value;
    if (options.post != null) {
      options.post.apply(this, arguments);
    }
    return this;
  };
};
