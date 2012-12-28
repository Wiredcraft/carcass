var debug = require('debug')('carcass:Factory:Server');

var express = require('express');
var _ = require('underscore');
var carcass = require('carcass');

// Server is something can create a server and listen on some connections.
// Servers in Carcass are also applications by themselves.
// Servers in Carcass can start and stop, and mount some applications.
function BaseServer(options) {
    debug('initializing %s.', this.constructor.title);
    this.app = express();
    carcass.plugins.configurable(this);
    this.initialize.apply(this, arguments);
};

// Initialize is an empty function by default. Override it with your own
// initialization logic.
BaseServer.prototype.initialize = function() {};

// .
BaseServer.prototype.start = function() {
    throw new Error('No default start method.');
};

// .
BaseServer.prototype.close = function() {
    throw new Error('No default close method.');
};

// .
// TODO: can be either a title or an initialized application or something else.
BaseServer.prototype.mount = function(title, route, options) {
    var plugin = this.getApplication(title);
    if (!plugin) return this;
    if (!route) {
        route = '/';
        options = {};
    } else if (_.isObject(route)) {
        options = route;
        route = '/';
    }
    debug('mounting %s to "%s".', plugin.title, route);
    this.app.use(route, plugin(options));
    return this;
};

// Get an application by the title.
// Support 'namespace/title', and default namespace to applications.
BaseServer.prototype.getApplication = function(title) {
    var namespace = 'applications';
    var parts = title.split('/');
    if (parts.length > 1) {
        namespace = parts[0];
        title = parts[1];
    }
    if (!carcass[namespace] || !carcass[namespace][title]) {
        debug('not found: %s/%s.', namespace, title);
        return;
    }
    return carcass[namespace][title];
};

// .
BaseServer.prototype.mountAll = function(namespace, route) {
    throw new Error('Not implemented yet.');
};


module.exports = function(args) {
    debug('building');

    args = args || {};

    // Also support only an initialize function as the argument.
    if (typeof args === 'function') {
        args = {
            initialize: args
        };
    }

    // The concrete factory.
    var builder = function(options) {
        // Merge .
        options = _.extend(_.omit(args, 'initialize'), options);

        var server = new BaseServer();

        // Invoke .
        if (args.initialize) {
            args.initialize(server, options);
        }

        return server;
    };

    return builder;
};
