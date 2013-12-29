var Config = require('../classes/Config');
var fs = require('fs');
var eson = require('eson');
var cjson = require('cjson');
var configurable = require('configurable');
var extend = require('es5-ext/lib/Object/extend-deep');

/**
 * Mixin this so your object / instance becomes a config manager. It will have
 *   the ability to load a stack of json files, parse them with a set of Eson
 *   plugins, and store the result in the object.
 *
 * @see `npm info configurable`
 *
 * Note that this is not the prototype of `carcass.classes.Config`, but actually
 *   uses the class. `Config` represents a config, while this provides a way of
 *   using the class with config files and some other tools such as `eson` and
 *   `cjson`.
 */
module.exports = {
    esonPlugins: esonPlugins,
    config: config,
    source: source,
    reload: reload
};

/**
 * Plugins for the Eson parser. Intended to be overridden. Note that you need to
 *   re-run the `config()` method after overriding this.
 */
function esonPlugins() {
    return [eson.bools];
}

/**
 * Setup config.
 */
function config() {
    configurable(this);
    // A default config loader.
    if (!this._config) this._config = new Config();
    // An Eson parser.
    var conf = eson();
    this.esonPlugins().forEach(function(_plugin) {
        conf.use(_plugin);
    });
    // Support comments in config with cjson.
    var parser = function(_path) {
        if (!fs.existsSync(_path)) return {};
        return conf.parse(cjson.decomment(fs.readFileSync(_path, 'utf8')));
    };
    this._config.parser(parser);
    return this;
}

/**
 * Route source() to stack().
 */
function source() {
    this._config.stack.apply(this._config, arguments);
    return this;
}

/**
 * Route reload() and configure myself.
 */
function reload() {
    var config = this._config.reload.apply(this._config, arguments);
    this.settings = extend(this.settings || {}, config);
    return config;
}
