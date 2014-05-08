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
 *   (1): `func(args..., callback)`
 *
 *   (2): `_.wrapInvoke('func_name', args_without_the_callback...)(context)`
 *
 * This can be used when you need to put the result of a typical callback-style
 *   function to a stream, and you also need to invoke the function with a
 *   context.
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
                push(null, _.nil)
            )
            invoke(args...)(context ? global)
        )

###*
 * Helper.
 *
 * Pipes a source (can be a stream or anything highland accepts) through one or
 *   several through streams. Also writes errors to the output.
 *
 * @return {Stream} the output stream
###
_.pipeThrough = (source, streams...) ->
    onError = (err) -> output.write(new StreamError(err))
    output = _()
    source = _(source).on('error', onError)
    source = source.pipe(through.on('error', onError)) for through in streams
    return source.pipe(output)

###*
 * Copied from highland; until it's exported.
###
class StreamError
    constructor: (err) ->
        @__HighlandStreamError__ = true
        @error = err
