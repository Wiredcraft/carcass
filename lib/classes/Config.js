var debug = require('debug')('carcass:config');

var mixable = require('../mixable');
var accessor = require('../helpers/accessor');
var stackProto = require('../proto/stack');
var slice = Array.prototype.slice;
var extend = require('es5-ext/lib/Object/extend-deep');

module.exports = Config;

/**
 * Represents a config.
 *
 * A config is only a loader. It loads multiple JSON objects from a stack of
 *   resources, merges them together, and returns the result. It only holds the
 *   resource stack, doesn't save the result.
 *
 * @param *source
 */
function Config() {
    // You can omit `new`, but you lose the arguments.
    if (!(this instanceof Config)) return new Config();
    this.initialize.apply(this, arguments);
}

mixable(Config);

Config.prototype.mixin(stackProto);

Config.prototype.mixin({
    initialize: initialize,
    parser: accessor('_parser'),
    reload: reload
});

/**
 * Initializer.
 */
function initialize() {
    // Default loader class.
    this.Loader = require('./Loader');
    // Default parser to a simple require.
    this.parser(require);
    // Use arguments as sources.
    slice.call(arguments).forEach(function(_source) {
        this.stack(_source);
    }, this);
    return this;
}

/**
 * Loads all the sources and parses with a given parser, and merges the results
 *   together.
 */
function reload() {
    debug('reloading');
    var config = this.stack().map(function(_source) {
        return (new this.Loader(_source)).parser(this._parser).reload();
    }, this).reduce(function(results, _config) {
        return extend(results, _config);
    }, {});
    return config;
}
