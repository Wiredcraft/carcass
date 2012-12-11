var carcass = require('carcass');

var Application = carcass.constructors.Application.extend();

// Cross-origin resource sharing.
// @see http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
Application.prototype.initialize = function() {
    this.use(function(req, res, next) {
        // TODO: API client registry?
        res.header('Access-Control-Allow-Origin', '*');

        // @see http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
        // TODO: auto populate like Express does.
        // TODO: 405 handler?
        // TODO: default handlers?
        res.header('Access-Control-Allow-Methods', [
            'HEAD',
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'TRACE',
            'OPTIONS',
            'CONNECT',
            'PATCH'
        ].join(', '));

        // @see http://en.wikipedia.org/wiki/List_of_HTTP_header_fields
        // TODO: review.
        res.header('Access-Control-Allow-Headers', [
            'Accept',
            'Accept-Charset',
            'Accept-Encoding',
            'Accept-Language',
            'Accept-Datetime',
            'Authorization',
            'Cache-Control',
            'Connection',
            'Cookie',
            'Content-Length',
            'Content-MD5',
            'Content-Type',
            'Date',
            'User-Agent',
            'X-Requested-With'
        ].join(', '));

        next();
    });
};

module.exports = Application;
