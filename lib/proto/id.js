var accessor = require('../helpers/accessor');
var isObject = require('es5-ext/lib/Object/is-object');
var validValue = require('es5-ext/lib/Object/valid-value');

/**
 * Mixin this so your object/instance can have an ID.
 */
module.exports = {
    id: accessor('_id', {
        pre: function(value) {
            // Also support a given object which contains an ID.
            if (isObject(value) && value.id) value = value.id;
            // ID must be a valid value.
            validValue(value);
            return value;
        }
    })
};
