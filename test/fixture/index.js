var carcass = require('carcass');

// Register models.
carcass.register(__dirname, 'models');

// Register applications.
carcass.register(__dirname, 'applications');

// .
var server = new carcass.servers.Http();

// Mount all registered applications and start the server.
exports.start = function(callback) {
    server.mountAll();
    return server.start(callback);
};

exports.close = function(callback) {
    return server.close(callback);
};
