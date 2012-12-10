var carcass = require('carcass');
var express = require('express');
var _ = require('underscore');
var debug = require('debug')('carcass:Server');

module.exports = Server;

// Server is something can create a server and listen on some connections.
// Servers in Carcass are also applications by themselves.
// Servers in Carcass can start and stop, and mount some applications.
function Server(attributes, options) {
    debug('initializing %s.', this.constructor.title);
    this.app = express();
    this.plugin('plugins', 'configurable');
    this.mounted = {};
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
Server.prototype.mount = function(title, route) {
    var self = this;
    // TODO: not only applications, but any namespace.
    if (!carcass.applications || !carcass.applications[title]) {
        return self;
    }
    // Don't mount a same application to a same route multiple times.
    route || (route = '/');
    self.mounted[route] || (self.mounted[route] = {});
    if (self.mounted[route][title]) {
        return self;
    }
    var app = new carcass.applications[title]();
    // Handle dependencies.
    _.each(app.dependencies || null, self.mount);
    debug('mounting %s to [%s].', app.constructor.title, route);
    self.app.use(route, app);
    self.mounted[route][title] = true;
    return self;
};

// .
Server.prototype.mountAll = function(namespace, route) {
    var self = this;
    namespace || (namespace = 'applications');
    route || (route = '/');
    debug('mounting all from %s to [%s].', namespace, route);
    _.each(carcass[namespace] || null, function(Res, title) {
        self.mount(title);
    });
    return this;
};
