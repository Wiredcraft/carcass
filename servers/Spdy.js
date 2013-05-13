var carcass = require('carcass');
var spdy = require('spdy');
var debug = require('debug')('carcass:spdy');

var Server = module.exports = carcass.constructors.Server.extend();

Server.prototype.start = function(options, callback) {
    if(options && typeof options === 'function') {
        callback = options;
        options = {};
    }
    this.server = spdy.createServer(options, this.app).listen(4000, callback);
    debug('Spdy server started.');
};

Server.prototype.close = function(callback) {
    this.server.close(callback);
    debug('Spdy server closed.');
};
