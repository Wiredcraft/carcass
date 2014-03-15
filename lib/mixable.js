var isObject, mixable;

isObject = require('es5-ext/lib/Object/is-object');


/**
 * Add a mixin() function to a target object.
 *
 * @param {Object}
 *
 * @return {Object}
 */

module.exports = mixable = function(obj) {
  if (obj == null) {
    obj = {};
  }
  if (!isObject(obj) || obj.mixin) {
    return obj;
  }
  if (obj.prototype) {
    mixable(obj.prototype);
  }
  obj.mixin = require('./helpers/mixin');
  return obj;
};
