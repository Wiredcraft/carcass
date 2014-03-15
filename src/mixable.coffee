isObject = require('es5-ext/lib/Object/is-object')

###*
 * Add a mixin() function to a target object.
 *
 * @param {Object}
 *
 * @return {Object}
###
module.exports = mixable = (obj = {}) ->
    # Do not override the mixin function, even it is not mine.
    return obj if not isObject(obj) or obj.mixin
    # Recursively make the prototypes mixable.
    mixable(obj.prototype) if obj.prototype
    # The common mixin.
    obj.mixin = require('./helpers/mixin')
    return obj
