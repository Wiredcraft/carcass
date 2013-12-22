var mixable = require('../mixable');

module.exports = Loader;

/**
 * A simple loader.
 *
 * @see lib/proto/loader.js
 */
function Loader(_source) {
    if (!(this instanceof Loader)) return new Loader(_source);
    this.source(_source);
}

mixable(Loader);

Loader.prototype.mixin(require('../proto/loader'));
