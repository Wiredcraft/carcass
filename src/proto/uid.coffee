accessor = require('../helpers/accessor')
uid = require('uid2')
isObject = require('es5-ext/lib/Object/is-object')

###*
 * Mixin this so your object / instance can have an ID, and in case no ID is
 *   provided before it's accessed, this will generate a random id with `uid2`.
 *
 * Also support a given object which contains an ID.
###
module.exports = {
    id: accessor('_id', {
        getDefault: -> return uid(7)
        pre: (value) ->
            return value._id ? value.id ? uid(7) if isObject(value)
            return value ? uid(7)
    })
}
