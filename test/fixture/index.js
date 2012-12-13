var carcass = require('carcass');

// Register models.
carcass.register(__dirname, 'models');

// Register applications.
carcass.register(__dirname, 'applications');

// .
var server = exports.server = new carcass.servers.Http();

// Mount some applications and start the server.
exports.start = function(callback) {
    server.mount('Cors');
    server.mount('Restify');
    server.mount('Lorem', '/lorem');
    return server.start(callback);
};

exports.close = function(callback) {
    return server.close(callback);
};
