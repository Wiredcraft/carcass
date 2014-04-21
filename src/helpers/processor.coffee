# debug = require('debug')('carcass:processor')

_ = require('highland')
invoke = require('es5-ext/function/invoke')
isString = require('es5-ext/string/is-string')
isObject = require('es5-ext/object/is-object')
isFunction = require('es5-ext/function/is-function')

###*
 * Builds a processor, which can be used to process a series of tasks, with the
 *   highland `flatMap()` function.
 *
 * @param {Object} context the `this` value when the tasks are invoked; can be
 *   null; can be overridden by the individual tasks.
 *
 * @return {Function} a processor
###
module.exports = (context) ->
    ###*
     * A task is defined with a handler, a set of arguments, and a context. Only
     *   the handler is required so the task can be just a function or a
     *   function name.
     *
     * @return {Object} a stream
    ###
    return (tasks) ->
        self = context ? @
        return _(tasks).flatMap((task) ->
            # debug('mapping', task)
            # Can be a string, in which case it is invoked with no arguments.
            if isString(task)
                # Can be a method of self.
                return self[task]() if self[task]?
                # Otherwise ignore.
                return
            # Can be a function, in which case it is invoked with no arguments.
            if isFunction(task)
                return task.call(self)
            # Can be an object.
            if isObject(task)
                # Ignore if no handler.
                return if not task.handler?
                # Build arguments.
                args = [task.handler]
                # The provided arguments are concatenated to args, so it doesn't
                # need to be an array.
                args = args.concat(task.args) if task.args?
                # Wrap with wrapInvoke() if the handler needs a callback,
                # otherwise it needs to return a value or a stream.
                _invoke = if task.callback then _.wrapInvoke(args...) else invoke(args...)
                # Context is default to self.
                return _invoke(task.context ? self)
            # Otherwise ignore.
            return
        ).compact()
