/**
 * Example of how would I build a tool that can parse a command line, load
 * config files, and start a server.
 * 
 * Mixin this example so your object/instance can have the abilities.
 */

var map = require('es5-ext/lib/Object/map');
var Command = require('commander').Command;

module.exports = {
    initCommand: initCommand,
    initConfig: initConfig,
    initServer: initServer,
    bootCommand: bootCommand,
    bootConfig: bootConfig,
    bootServer: bootServer,
    registerServer: registerServer
};

/**
 * Initialize command. Default to a new instance.
 * 
 * This is essential because most of other methods require a command.
 */
function initCommand(_command) {
    this._command = _command || new Command(this._id);
    return this;
}

/**
 * Initialize config with a given config manager (e.g. which mixin
 * `examples.proto.config`).
 */
function initConfig(_manager) {
    this._manager = _manager;
    // An extra config file can be given with the command.
    this._command.option('-C, --config <name>', 'Load an extra config');
    return this;
}

/**
 * Initialize support of "server".
 */
function initServer(servers) {
    this.servers = {};
    // A server can be started with the command.
    this._command.option('-S, --server <name>', 'Start a server');
    // Register servers, if provided.
    if (servers) {
        map(servers, this.registerServer, this);
    }
    return this;
}

/**
 * Start the command with a given process.
 */
function bootCommand(_process) {
    this._process = _process;
    this._command.parse(_process.argv);
    // Get the server early so it got chances to hook into the other steps.
    if (this._command.server && this.servers) {
        this._server = this.servers[this._command.server] || null;
    }
    return this;
}

/**
 * Load config, if a config manager was provided.
 */
function bootConfig() {
    if (!this._manager) return this;
    // An extra config file can be given with the command.
    if (this._command.config) {
        this._manager.source(this._command.config);
    }
    // Server can do something before the config files are loaded.
    if (this._server && this._server.config) {
        this._server.config(this._command);
    }
    // Load config.
    this._manager.reload();
    return this;
}

/**
 * Start a registered server, if the command asked for it.
 */
function bootServer() {
    if (!this._server || !this._server.start) return this;
    // Start server and send a message to the master process.
    var _process = this._process;
    this._server.start(this._command, function() {
        _process && _process.send && _process.send({
            listening: true
        });
    });
    return this;
}

/**
 * Register a server.
 */
function registerServer(server, name) {
    var command = this._command;
    // A server can be registered with a different name.
    this.servers[name || server.id()] = server;
    // A server can come with some command line options.
    if (server.options) {
        server.options.forEach(function(option) {
            command.option.apply(command, option);
        });
    }
    return this;
}
