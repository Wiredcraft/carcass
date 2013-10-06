var _ = require('underscore');

// I am Carcass.
require('./lib/carcass')(exports);

// Register plugins.
exports.register(__dirname, 'plugins');

// Register utils.
exports.register(__dirname, 'utils');

// Shortcuts.
exports.httpError = exports.utils.httpError;

// Register constructors.
exports.register(__dirname, 'constructors');

// Register factories.
exports.register(__dirname, 'factories');

// .
_.each(exports.constructors, function(obj) {
    if (!obj.prototype) return;
    exports.mixable(obj);
    exports.plugins.extendable(obj);
});

// Register servers.
exports.register(__dirname, 'servers');

// Register applications.
exports.register(__dirname, 'applications');

// Export examples.
exports.examples = require('./examples');
