# debug = require('debug')('carcass:helper:mixin')

descriptor = Object.getOwnPropertyDescriptor
properties = Object.getOwnPropertyNames
defineProp = Object.defineProperty

###*
 * The common mixin, simply merges properties, by redefining the same properties
 *   from the source.
 *
 * @param {Object} source
 *
 * @return {this}
###
module.exports = mixin = (source) ->
    # Merge.
    # TODO: optionally prevent overriding?
    # TODO: optionally merge non-enumerable properties?
    for key in properties(source)
        if source.propertyIsEnumerable(key)
            defineProp(@, key, descriptor(source, key))
    return @
