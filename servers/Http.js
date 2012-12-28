var carcass = require('carcass');
var http = require('http');
var debug = require('debug')('carcass:Http');

var Server = module.exports = carcass.factories.Server({
	initialize : initialize
});

function initialize(server, options) {
	debug('initializing');

	server.constructor.prototype.start = function(callback) {
	    this.server = http.createServer(this.app).listen(3000, callback);
	    debug('server started.');
	};

	server.constructor.prototype.close = function(callback) {
	    this.server.close(callback);
	    debug('server closed.');
	};
}

