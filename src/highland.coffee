module.exports = _ = require('highland')

invoke = require('es5-ext/lib/Function/invoke')

###*
 * A wrap of es5-ext's invoke().
 *
 * Similar to _.wrapCallback(f) with the difference that this can be used to
 *   invoke the function with a context (`this` in the function).
 *
 * This has a same syntax with invoke(); you invoke a function `func([0 to
 *   many arguments], done)` with `_.wrapInvoke(func, [the arguments without
 *   the done])(context or null)` and it will return a stream.
 *
 * @return {Function} the wrapped function
###
_.wrapInvoke = (args...) ->
    ###*
     * @return {Object} a stream that yields the result when callback is invoked
    ###
    return (context) ->
        return _((push) ->
            args.push((err, res) ->
                if err then push(err) else push(null, res)
                push(null, nil)
            )
            invoke(args...)(context)
        )
