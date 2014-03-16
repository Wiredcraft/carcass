var Config, accessor, debug, extend, mixable, stacker;

debug = require('debug')('carcass:class:Config');

mixable = require('../mixable');

accessor = require('../helpers/accessor');

stacker = require('../helpers/stacker');

extend = require('es5-ext/lib/Object/extend-deep');


/**
 * Represents a config.
 *
 * A config is only a loader. It loads multiple JSON objects from a stack of
 *   resources, merges them together, and returns the result. It only holds the
 *   resource stack, doesn't save the result.
 *
 * @param *source
 */

module.exports = Config = (function() {
  function Config() {
    this.initialize.apply(this, arguments);
  }

  return Config;

})();

mixable(Config);


/**
 * A stack of sources.
 *
 * @type {Function}
 */

Config.prototype.source = stacker('_sources');


/**
 * One parser.
 *
 * @type {Function}
 */

Config.prototype.parser = accessor('_parser');


/**
 * Initializer.
 */

Config.prototype.initialize = function() {
  var source, _i, _len;
  this.parser(require);
  for (_i = 0, _len = arguments.length; _i < _len; _i++) {
    source = arguments[_i];
    this.source(source);
  }
  return this;
};


/**
 * Loads all the sources and parses with a given parser, and merges the results
 *   together.
 */

Config.prototype.reload = function() {
  var config, source, _i, _len, _ref;
  debug('reloading');
  config = {};
  _ref = this.source();
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    source = _ref[_i];
    extend(config, this.parser()(source));
  }
  return config;
};
