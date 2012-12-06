var carcass = require('carcass');
var http = require('http');
var debug = require('debug')('carcass:Http');

var Server = module.exports = carcass.constructors.Server.extend();

Server.prototype.start = function(callback) {
    this.server = http.createServer(this.app).listen(3000, callback);
    debug('server started.');
};

Server.prototype.close = function(callback) {
    this.server.close(callback);
    debug('server closed.');
};
