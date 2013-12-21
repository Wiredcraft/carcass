var carcass = require('../..');

module.exports = Loader;

/**
 * A simple loader, prepared for `carcass.tools.config`.
 */
function Loader(_source) {
    if (!(this instanceof Loader)) return new Loader(_source);
    this.source(_source);
}

carcass.mixable(Loader);

Loader.prototype.mixin(carcass.proto.loader);
