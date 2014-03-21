var Carcass, debug, libRoot, mixable, path;

debug = require('debug')('carcass:class:Carcass');

path = require('path');

mixable = require('../mixable');

libRoot = path.resolve(__dirname, '..');

require('es6-shim');


/**
 * It's simply a class.
 */

module.exports = Carcass = (function() {
  function Carcass(options) {
    this.id(options);
    debug('initializing carcass %s.', this.id());
  }

  return Carcass;

})();

Carcass.prototype.mixable = mixable;

Carcass.prototype.highland = require('../highland');

Carcass.prototype.postal = require('../postal');

mixable(Carcass);

Carcass.prototype.mixin(require('../proto/uid'));

Carcass.prototype.mixin(require('../proto/register'));

Carcass.prototype.register(libRoot, 'classes');

Carcass.prototype.register(libRoot, 'helpers');

Carcass.prototype.register(libRoot, 'proto');

Carcass.prototype.mixin(require('es5-ext'));
