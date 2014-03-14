accessor = require('./accessor')
extend = require('es5-ext/lib/Object/extend')

###*
 * A special accessor, where the value is an array and when you call the
 *   function with a new value it gets pushed to the array. Options can be
 *   overridden.
 *
 * @return {Function} a stacker
###
module.exports = stacker = (key, options = {}) ->
    return accessor(key, extend({
        getDefault: -> []
        pre: (value) ->
            _stack = @[key] ? []
            _stack.push(value)
            return _stack
    }), options)
