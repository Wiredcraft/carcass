var Loader, mixable;

mixable = require('../mixable');


/**
 * A simple loader.
 *
 * @see lib/proto/loader.js
 */

module.exports = Loader = (function() {
  function Loader() {
    this.source.apply(this, arguments);
  }

  return Loader;

})();


/**
 * Mixins.
 */

mixable(Loader);

Loader.prototype.mixin(require('../proto/loader'));
