var debug = require('debug')('carcass:Server');

var carcass = require('carcass');
var express = require('express');
var _ = require('underscore');

module.exports = Server;

// Server is something can create a server and listen on some connections.
// Servers in Carcass are also applications by themselves.
// Servers in Carcass can start and stop, and mount some applications.
function Server(attributes, options) {
    debug('initializing %s.', this.constructor.title);
    this.app = express();
    carcass.plugins.configurable(this);
    this.initialize.apply(this, arguments);
};

// Initialize is an empty function by default. Override it with your own
// initialization logic.
Server.prototype.initialize = function() {};

// .
Server.prototype.start = function() {
    throw new Error('No default start method.');
};

// .
Server.prototype.close = function() {
    throw new Error('No default close method.');
};

// .
Server.prototype.mount = function(plugin, route) {
    var self = this;
    route || (route = '/');
    // Support 'namespace/title', and default namespace to applications.
    var namespace = 'applications';
    var parts = plugin.split('/');
    if (parts.length > 1) {
        namespace = parts[0];
        plugin = parts[1];
    }
    if (!carcass[namespace] || !carcass[namespace][plugin]) {
        debug('not found: %s/%s.', namespace, plugin);
        return self;
    }
    debug('mounting %s/%s to "%s".', namespace, plugin, route);
    var app = new carcass[namespace][plugin]();
    self.app.use(route, app);
    return self;
};

// .
Server.prototype.mountAll = function(namespace, route) {
    throw new Error('Not implemented yet.');
};
