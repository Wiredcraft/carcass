debug = require('debug')('carcass:class:Config')

mixable = require('../mixable')
accessor = require('../helpers/accessor')
stacker = require('../helpers/stacker')
extend = require('es5-ext/lib/Object/extend-deep')

###*
 * Represents a config.
 *
 * A config is only a loader. It loads multiple JSON objects from a stack of
 *   resources, merges them together, and returns the result. It only holds the
 *   resource stack, doesn't save the result.
 *
 * @param *source
###
module.exports = class Config
    constructor: -> @initialize(arguments...)

mixable(Config)

###*
 * A stack of sources.
 *
 * @type {Function}
###
Config::source = stacker('_sources')

###*
 * One parser.
 *
 * @type {Function}
###
Config::parser = accessor('_parser')

###*
 * Initializer.
###
Config::initialize = ->
    # Default parser to a simple require.
    @parser(require)
    # Use arguments as sources.
    @source(source) for source in arguments
    return @

###*
 * Loads all the sources and parses with a given parser, and merges the results
 *   together.
###
Config::reload = ->
    debug('reloading')
    config = {}
    extend(config, @parser()(source)) for source in @source()
    return config
