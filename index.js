var path = require('path');
var fs = require('fs');
var _ = require('underscore');

// I am Carcass.
require('./lib/carcass')(exports);

// Register plugins.
exports.register(__dirname, 'plugins');

// Register constructors.
exports.register(__dirname, 'constructors');

// .
_.each(exports.constructors, function(obj) {
    if (!obj.prototype) return;
    exports.mixable(obj);
    exports.mixable(obj.prototype);
    obj.mixin('plugins', 'extendable');
});

// Register servers.
exports.register(__dirname, 'servers');
