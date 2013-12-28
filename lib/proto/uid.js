var accessor = require('../helpers/accessor');
var uid = require('uid2');
var isObject = require('es5-ext/lib/Object/is-object');

/**
 * Mixin this so your object/instance can have an ID, and in case no ID is
 *   provided before it's accessed, this will generate a random id with `uid2`.
 */
module.exports = {
    id: accessor('_id', {
        getDefault: function() {
            return uid(7);
        },
        pre: function(value) {
            // Also support a given object which contains an ID.
            if (isObject(value) && value.id) return value.id;
            return value;
        }
    })
};
