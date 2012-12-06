var carcass = require('carcass');
var express = require('express');
var _ = require('underscore');
var debug = require('debug')('carcass:Server');

module.exports = Server;

// Server is something can create a server and listen on some connections.
// Servers in Carcass are also applications by themselves.
// Servers in Carcass can start and stop, and mount some applications.
function Server(attributes, options) {
    this.app = express();
    this.mounted = {};
    debug('initializing %s.', this.constructor.title);
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
Server.prototype.mount = function(name, route) {
    var self = this;
    if (!carcass.applications || !carcass.applications[name]) {
        return self;
    }
    // Don't mount a same application to a same route multiple times.
    route || (route = '/');
    self.mounted[route] || (self.mounted[route] = {});
    if (self.mounted[route][name]) {
        return self;
    }
    var app = new carcass.applications[name]();
    // Handle dependencies.
    _.each(app.dependencies || null, function(name, route) {
        self.mount(name, route);
    });
    debug('mounting %s to [%s].', app.constructor.title, route);
    self.app.use(route, app);
    self.mounted[route][name] = true;
    return self;
};

// .
Server.prototype.mountAll = function() {
    var self = this;
    _.each(carcass.applications || null, function(Res, name) {
        self.mount(name);
    });
    return this;
};
