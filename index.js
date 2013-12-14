var _ = require('underscore');

// I am Carcass.
require('./lib/carcass')(exports);

// Register plugins.
exports.register(__dirname, 'plugins');

// Register servers.
exports.register(__dirname, 'servers');

// Register applications.
exports.register(__dirname, 'applications');

// Export examples.
exports.examples = require('./examples');
