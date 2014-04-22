debug = require('debug')('carcass:proto:register')

slice = Array.prototype.slice
isObject = require('es5-ext/object/is-object')
mixin = require('es5-ext/object/mixin')
path = require('path')
fs = require('fs')

module.exports = {
    ###*
     * Register.
     *
     * See tests for details.
     *
     * @param root
     * @param *name
     * @return {this}
    ###
    register: (root, names...) ->
        leaf = @
        dir = path.resolve(root)
        for name in names
            leaf[name] = {} if not isObject(leaf[name])
            leaf = leaf[name]
            dir = path.resolve(dir, name)
        walk(leaf, dir, @registerOptions ? {})
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
walk = (leaf, dir, options) ->
    # TODO: make this an option.
    ext = '.js'
    index = null
    try
        files = fs.readdirSync(dir)
    catch e
        debug(e)
    return if not files?
    files.forEach((filename) ->
        filepath = path.resolve(dir, filename)
        if path.extname(filename) is ext
            name = path.basename(filename, ext)
            if name is 'index'
                return index = filepath
            _reg(leaf, name, filepath)
        else if not options.noRecursive and fs.statSync(filepath).isDirectory()
            if not isObject(leaf[filename])
                leaf[filename] = {}
            walk(leaf[filename], filepath, options)
    )
    # An index file can be used to override everything.
    if not options.noIndex and index
        mixin(leaf, require(index))

###*
 * Defines a getter, which is simply a require(). Returns nothing.
 *
 * @param leaf
 * @param name
 * @param filepath
###
_reg = (leaf, name, filepath) ->
    Object.defineProperty(leaf, name, {
        configurable: true
        enumerable: true
        get: ->
            if not require.cache[filepath]?
                debug('loading %s.', filepath)
            return require(filepath)
    })
