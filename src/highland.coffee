module.exports = _ = require('highland')

global = require('es5-ext/global')
invoke = require('es5-ext/function/invoke')

###*
 * A wrap of es5-ext's invoke().
 *
 * Similar to _.wrapCallback(f) with the difference that this can be used to
 *   invoke the function with a context (`this` in the function).
 *
 * This has a same syntax with invoke(); you invoke a function (1) with the
 *   syntax of (2) and it will return a stream.
 *
 *   1: `func(args..., callback)`
 *
 *   2: `_.wrapInvoke('func_name', args_without_the_callback...)(context)`
 *
 * @return {Function} the wrapped function
###
_.wrapInvoke = (args...) ->
    ###*
     * @return {Stream} will yield the result when the callback is invoked
    ###
    return (context) ->
        return _((push) ->
            args.push((err, res) ->
                if err then push(err) else push(null, res)
                push(null, nil)
            )
            invoke(args...)(context ? global)
        )
