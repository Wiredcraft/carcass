accessor = require('../helpers/accessor')
isObject = require('es5-ext/object/is-object')
validValue = require('es5-ext/object/valid-value')

###*
 * Mixin this so your object / instance can have an ID, which cannot be a null
 *   or undefined value.
 *
 *  Also support a given object which contains an ID.
###
module.exports = {
    id: accessor('_id', {
        pre: (value) ->
            return validValue(value._id ? value.id) if isObject(value)
            return validValue(value)
    })
}
