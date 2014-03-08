# debug = require('debug')('carcass:helper:mixin')

descriptor = Object.getOwnPropertyDescriptor
properties = Object.getOwnPropertyNames
defineProp = Object.defineProperty

###*
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 * @param {Object|null} options
 *
 * @return {this}
###
module.exports = mixin = (source, options) ->
    # options ?= {}
    # Merge.
    # TODO: optionally prevent overriding?
    # TODO: optionally merge non-enumerable properties?
    properties(source).reduce((target, key) ->
        return target if not source.propertyIsEnumerable(key)
        return defineProp(target, key, descriptor(source, key))
    , @)
    return @
