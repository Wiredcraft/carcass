var debug = require('debug')('carcass:config');

var mixable = require('../mixable');
var accessor = require('../helpers/accessor');
var slice = Array.prototype.slice;
var extend = require('es5-ext/lib/Object/extend-deep');

module.exports = Config;

/**
 * Builds a new config.
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

Config.prototype.mixin(require('../proto/stack'));

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
    this.stack = [];
    slice.call(arguments).forEach(function(_source) {
        this.use(_source);
    }, this);
    return this;
}

/**
 * ...
 *
 * @return {Object}
 */
function reload() {
    if (!this.stack || !this.stack.length) return {};
    debug('reloading');
    var config = this.stack.map(function(_source) {
        return new this.Loader(_source).parser(this._parser).reload();
    }, this).reduce(function(results, _config) {
        return extend(results, _config);
    }, {});
    return config;
}
