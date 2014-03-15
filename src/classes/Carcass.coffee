debug = require('debug')('carcass:class:Carcass')

path = require('path')
mixable = require('../mixable')
libRoot = path.resolve(__dirname, '..')

# ES6 Shim automatically extends JS.
require('es6-shim')

###*
 * It's simply a class.
###
module.exports = class Carcass
    constructor: (options) ->
        @id(options)
        debug('initializing carcass %s.', @id())
        # Initialize config.
        @config()

# Mixable and mixin is the way we do code sharing.
Carcass::mixable = mixable

# Highland is a high-level streams library.
# @see `npm info highland`
Carcass::highland = require('../highland')

# Postal.js is an in-memory message bus.
# @see `npm info postal`
Carcass::postal = require('../postal')

# Mixins.
# ---
mixable(Carcass)

# UID.
Carcass::mixin(require('../proto/uid'))

# Register.
Carcass::mixin(require('../proto/register'))

# Config manager.
Carcass::mixin(require('../proto/configManager'))

# Exports.
# ---
Carcass::register(libRoot, 'classes')
Carcass::register(libRoot, 'helpers')
Carcass::register(libRoot, 'proto')

# Export es5-ext.
Carcass::mixin(require('es5-ext'))
