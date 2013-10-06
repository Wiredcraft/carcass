var carcass = require('../..');

// Register applications.
carcass.register(__dirname, 'applications');

// Expose an HTTP server.
var server = exports.server = new carcass.servers.Http();
