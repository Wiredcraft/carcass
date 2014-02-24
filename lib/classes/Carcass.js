var debug = require('debug')('carcass:class:Carcass');

var path = require('path');
var mixable = require('../mixable');
var libRoot = path.resolve(__dirname, '..');

// ES6 Shim automatically extends JS.
require('es6-shim');

module.exports = Carcass;

/**
 * It's simply a class.
 */
function Carcass(options) {
    if (!(this instanceof Carcass)) return new Carcass(options);
    this.id(options);
    debug('initializing carcass %s.', this.id());
    // Initialize config.
    this.config();
}

// Mixable and mixin is the way we do code sharing.
Carcass.prototype.mixable = mixable;

// Highland is a high-level streams library.
// @see `npm info highland`
Carcass.prototype.highland = require('../highland');

// Deferred is a promise implementation.
// @see `npm info deferred`
Carcass.prototype.deferred = require('../deferred');

// Postal.js is an in-memory message bus.
// @see `npm info postal`
Carcass.prototype.postal = require('../postal');

// Mixins.
// ---
mixable(Carcass);

// UID.
Carcass.prototype.mixin(require('../proto/uid'));

// Register.
Carcass.prototype.mixin(require('../proto/register'));

// Config manager.
Carcass.prototype.mixin(require('../proto/configManager'));

// Exports.
// ---
Carcass.prototype.register(libRoot, 'classes');
Carcass.prototype.register(libRoot, 'helpers');
Carcass.prototype.register(libRoot, 'proto');

// Export es5-ext.
Carcass.prototype.mixin(require('es5-ext'));
