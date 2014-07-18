var Carcass, debug, libRoot, mixable, path;

debug = require('debug')('carcass:class:Carcass');

path = require('path');

mixable = require('../mixable');

libRoot = path.resolve(__dirname, '..');


/**
 * ES6 Shim automatically extends JS.
 */

require('es6-shim');


/**
 * This extends JS Array with new methods.
 */

require('highland-array');


/**
 * It's simply a class.
 */

module.exports = Carcass = (function() {

  /**
   * Constructor.
   */
  function Carcass(options) {
    this.id(options);
    debug('initializing the %s carcass.', this.id());
  }


  /**
   * Mixable and mixin is the way we do code sharing.
   */

  Carcass.prototype.mixable = mixable;


  /**
   * Highland is a high-level streams library.
   *
   * @see `npm info highland`
   */

  Carcass.prototype.highland = require('../highland');


  /**
   * Postal.js is an in-memory message bus.
   *
   * @see `npm info postal`
   */

  Carcass.prototype.postal = require('../postal');


  /**
   * A tool that builds an HTTP error with something.
   *
   * @see `npm info build-http-error`
   */

  Carcass.prototype.httpError = require('build-http-error');

  return Carcass;

})();


/**
 * Mixins.
 */

mixable(Carcass);


/**
 * UID.
 */

Carcass.prototype.mixin(require('../proto/uid'));


/**
 * Register.
 */

Carcass.prototype.mixin(require('../proto/register'));


/**
 * Exports.
 */

Carcass.prototype.register(libRoot, 'classes');

Carcass.prototype.register(libRoot, 'helpers');

Carcass.prototype.register(libRoot, 'proto');


/**
 * Export es5-ext.
 */

Carcass.prototype.mixin(require('es5-ext'));
