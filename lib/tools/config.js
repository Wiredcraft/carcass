var debug = require('debug')('carcass:config');

var carcass = require('../../');
var slice = Array.prototype.slice;
var extend = require('es5-ext/lib/Object/extend-deep');

module.exports = Config;

/**
 * Builds a new config.
 * 
 * A config is only a loader. It loads multiple JSON objects from a stack of
 * resources, merges them together, and returns the result. It only holds the
 * resource stack, doesn't save the result.
 * 
 * @param *source
 * @return config
 */
function Config() {

    function config() {
        return config.reload();
    }

    carcass.mixable(config);

    config.mixin(carcass.proto.stack);

    config.mixin(Config.proto);

    config.stack = [];

    // Default to a simple require.
    config.parser(require);

    slice.call(arguments).forEach(function(source) {
        config.use(source);
    });

    return config;
}

Config.proto = {
    parser: parser,
    reload: reload
};

Config.Loader = Loader;

/**
 * ...
 * 
 * @return {Object}
 */
function reload() {
    var self = this;
    if (!self.stack || !self.stack.length) return {};
    debug('reloading');
    var config = self.stack.map(function(_source) {
        return Config.Loader(_source).parser(self._parser).reload();
    }).reduce(function(results, _config) {
        return extend(results, _config);
    }, {});
    return config;
}

/**
 * Accessor.
 */
function parser(_parser) {
    if (0 === arguments.length) return this._parser;
    this._parser = _parser;
    return this;
}

/**
 * ...
 */
function Loader(_source) {
    if (!(this instanceof Loader)) return new Loader(_source);
    this.source(_source);
}
carcass.mixable(Loader);
Loader.prototype.mixin(carcass.proto.loaderSync);
