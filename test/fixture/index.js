var carcass = require('carcass');

// Register models.
carcass.register(__dirname, 'models');

// Register applications.
carcass.register(__dirname, 'applications');

// Expose an HTTP server.
var server = exports.server = new carcass.servers.Http();
