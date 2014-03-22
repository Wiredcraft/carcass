mixable = require('../mixable')

###*
 * A simple loader.
 *
 * @see lib/proto/loader.js
###
module.exports = class Loader
    constructor: () -> @source(arguments...)

###*
 * Mixins.
###
mixable(Loader)
Loader::mixin(require('../proto/loader'))
