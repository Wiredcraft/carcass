accessor = require('../helpers/accessor')

###*
 * Mixin this so your object / instance can become a "loader", which can have a
 *   source, a parser, and can load the source with the parser.
 *
 * @type {Object}
###
module.exports = {
    source: accessor('_source')
    parser: accessor('_parser')

    ###*
     * Reload from source. Parse source if a parser is available.
     *
     * @return {value}
    ###
    reload: ->
        source = @source()
        return if not source?
        parser = @parser()
        return if parser? then parser(source) else source
}
