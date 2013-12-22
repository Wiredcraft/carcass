// I am Carcass.
require('./lib/carcass')(exports);

// Register applications.
exports.register(__dirname, 'applications');

// Export examples.
exports.examples = require('./examples');
