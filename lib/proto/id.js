var accessor, isObject, validValue;

accessor = require('../helpers/accessor');

isObject = require('es5-ext/object/is-object');

validValue = require('es5-ext/object/valid-value');


/**
 * Mixin this so your object / instance can have an ID, which cannot be a null
 *   or undefined value.
 *
 *  Also support a given object which contains an ID.
 */

module.exports = {
  id: accessor('_id', {
    pre: function(value) {
      var _ref;
      if (isObject(value)) {
        return validValue((_ref = value._id) != null ? _ref : value.id);
      }
      return validValue(value);
    }
  })
};
