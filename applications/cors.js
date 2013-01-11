var debug = require('debug')('carcass:Application:Cors');

var carcass = require('carcass');

// Cross-origin resource sharing.
// @see http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
module.exports = carcass.factories.Express({
    title: 'Cors',
    initialize: initialize
});

function initialize(app, options) {
    debug('initializing');

    // app.all('*', function(req, res, next) {
    app.use(function(req, res, next) {
        // Origin in headers is required.
        if (!req.get('Origin')) return next();

        // TODO: API client registry?
        // Access-Control-Allow-Origin must be explicit or Allow-Credentials
        // would fail. 
        res.header('Access-Control-Allow-Origin', req.get('Origin'));
        
        // @see https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS
        res.header('Access-Control-Allow-Credentials', 'true')

        // @see http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
        // TODO: auto populate like Express 2 does.
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

    // TODO: auto populate like Express 2 does.
    app.options('*', function(req, res, next) {
        return res.send(200, [
            'HEAD',
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'TRACE',
            'OPTIONS',
            'CONNECT',
            'PATCH'
        ].join(','));
    });
}
