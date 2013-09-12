/**
 * Example of ...
 */

var carcass = require('../..');
var fs = require('fs');
var eson = require('eson');
var cjson = require('cjson');
var extend = require('es5-ext/lib/Object/extend-deep');

module.exports = {
    esonPlugins: esonPlugins,
    config: config,
    source: source,
    reload: reload
};

/**
 * Plugins for the Eson parser. Intended to be overridden.
 */
function esonPlugins() {
    return [eson.bools];
}

/**
 * Setup config.
 */
function config() {
    carcass.plugins.configurable(this);
    // A config loader.
    this._config = carcass.tools.config();
    // An Eson parser.
    var conf = eson();
    this.esonPlugins().forEach(function(_plugin) {
        conf.use(_plugin);
    });
    // Support comments in config with cjson.
    var parser = function(path) {
        return conf.parse(cjson.decomment(fs.readFileSync(path, 'utf8')));
    };
    this._config.parser(parser);
    return this;
}

/**
 * Route source().
 */
function source() {
    this._config.use.apply(this._config, arguments);
    return this;
}

/**
 * Route reload() and configure myself.
 */
function reload() {
    var config = this._config.reload.apply(this._config, arguments);
    this.settings && extend(this.settings, config);
    return config;
}
