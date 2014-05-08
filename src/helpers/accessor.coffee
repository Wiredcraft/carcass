validValue = require('es5-ext/object/valid-value')
isFunction = require('es5-ext/function/is-function')

###*
 * Builds an accessor.
 *
 * @param {String} key
 * @param {Function|Object} hooks, either the getDefault() hook or a set of
 *   hooks
 *
 * @option hooks {Function} getDefault: can be used to provide a default value
 *   when there's no value set already.
 * @option hooks {Function} pre: can be used to do whatever before the value
 *   is set. Note that if it presents, the return value will be used.
 * @option hooks {Function} post: can be used to do whatever after the value
 *   is set.
 *
 * @return {Function} an accessor
###
module.exports = accessor = (key, options = {}) ->

    validValue(key)

    options = { getDefault: options } if isFunction(options)

    ###*
     * A simple accessor.
     *
     * Use it with an argument to set a value, and use without any argument to
     *   retrieve the value.
     *
     * @return {value|this} depends on you are getting or setting
    ###
    return (value) ->
        if not arguments.length
            if not @[key]? and options.getDefault?
                @[key] = options.getDefault.call(@)
            return @[key]
        value = options.pre.apply(@, arguments) if options.pre?
        @[key] = value
        options.post.apply(@, arguments) if options.post?
        return @
