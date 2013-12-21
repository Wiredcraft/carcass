// I am Carcass.
require('./lib/carcass')(exports);

// Register plugins.
exports.register(__dirname, 'plugins');

// Register applications.
exports.register(__dirname, 'applications');

// Export examples.
exports.examples = require('./examples');
