debug = require('debug')('carcass:class:Carcass')

path = require('path')
mixable = require('../mixable')
libRoot = path.resolve(__dirname, '..')

###*
 * ES6 Shim automatically extends JS.
###
require('es6-shim')

###*
 * This extends JS Array with new methods.
###
require('highland-array')

###*
 * It's simply a class.
###
module.exports = class Carcass
    ###*
     * Constructor.
    ###
    constructor: (options) ->
        @id(options)
        debug('initializing carcass %s.', @id())

    ###*
     * Mixable and mixin is the way we do code sharing.
    ###
    mixable: mixable

    ###*
     * Highland is a high-level streams library.
     *
     * @see `npm info highland`
    ###
    highland: require('../highland')

    ###*
     * Postal.js is an in-memory message bus.
     *
     * @see `npm info postal`
    ###
    postal: require('../postal')

###*
 * Mixins.
###
mixable(Carcass)

###*
 * UID.
###
Carcass::mixin(require('../proto/uid'))

###*
 * Register.
###
Carcass::mixin(require('../proto/register'))

###*
 * Exports.
###
Carcass::register(libRoot, 'classes')
Carcass::register(libRoot, 'helpers')
Carcass::register(libRoot, 'proto')

###*
 * Export es5-ext.
###
Carcass::mixin(require('es5-ext'))
