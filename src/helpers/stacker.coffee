accessor = require('./accessor')

###*
 * A special accessor, where the value is an array and when you call the
 *   function with a new value it gets pushed to the array. Options can be
 *   overridden.
 *
 * @return {Function} a stacker
###
module.exports = stacker = (key, options = {}) ->
    return accessor(key, Object.assign({
        getDefault: -> []
        pre: (value) ->
            _stack = @[key] ? []
            _stack.push(value)
            return _stack
    }, options))
