debug = require('debug')('carcass:proto:register')

path = require('path')
fs = require('fs')
mixin = require('es5-ext/object/mixin')
isObject = require('es5-ext/object/is-object')
accessor = require('../helpers/accessor')

module.exports = {
    ###*
     * Register.
     *
     * See tests for details.
     *
     * @param root
     * @param *name
     *
     * @return {this}
    ###
    register: (root, names..., name) ->
        leaf = @
        dir = path.resolve(root)
        for _name in names
            # Must be an object.
            leaf[_name] = {} if not isObject(leaf[_name])
            leaf = leaf[_name]
            dir = path.resolve(dir, _name)
        # Extract name from root if there's no name.
        if not name?
            name = path.basename(dir, path.extname(dir))
            dir = path.dirname(dir)
        walk(leaf, dir, name)
        return @

    ###*
     * Extend with another register.
     *
     * @param lib
     * @param *name
     *
     * @return {this}
    ###
    extend: (lib, names...) ->
        for name in names
            return if not lib[name]?
            # Create an object if nothing is there.
            @[name] = {} if not @[name]?
            # But do not override.
            return if not isObject(@[name])
            # Mixin.
            mixin(@[name], lib[name])
        return @
}

###*
 * Registers a directory recursively by default. Sub-directories are omitted if
 * a noRecursive option is given.
 *
 * @param leaf
 * @param dir
 * @param options
###
walk = (leaf, dir, name) ->
    subPath = path.resolve(dir, name)
    # Handle with require if possible.
    try modPath = require.resolve(subPath)
    if modPath?
        return _reg(leaf, name, modPath)
    # Handle as a directory if possible.
    try files = fs.readdirSync(subPath)
    if files?
        # Create an object if nothing is there.
        leaf[name] = {} if not leaf[name]?
        # But do not override.
        return if not isObject(leaf[name])
        # Walk recursively.
        files.map (filename) ->
            walk(leaf[name], subPath, filename)
    # TODO: what else?

###*
 * Defines a getter, which is simply a require(). Returns nothing.
 *
 * @param leaf
 * @param name
 * @param filepath
###
_reg = (leaf, name, filepath) ->
    name = path.basename(name, path.extname(name))
    Object.defineProperty(leaf, name, {
        configurable: true
        enumerable: true
        get: ->
            if not require.cache[filepath]?
                debug('loading %s.', filepath)
            return require(filepath)
    })
    return true
