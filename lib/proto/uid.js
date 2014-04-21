var accessor, isObject, uid;

accessor = require('../helpers/accessor');

uid = require('uid2');

isObject = require('es5-ext/object/is-object');


/**
 * Mixin this so your object / instance can have an ID, and in case no ID is
 *   provided before it's accessed, this will generate a random id with `uid2`.
 *
 * Also support a given object which contains an ID.
 */

module.exports = {
  id: accessor('_id', {
    getDefault: function() {
      return uid(7);
    },
    pre: function(value) {
      var _ref, _ref1;
      if (isObject(value)) {
        return (_ref = (_ref1 = value._id) != null ? _ref1 : value.id) != null ? _ref : uid(7);
      }
      return value != null ? value : uid(7);
    }
  })
};
