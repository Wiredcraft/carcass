var carcass     = require('carcass'),
    express     = require('express'),
    RedisStore  = require('connect-redis')(express);

// Register applications.
carcass.register(__dirname, 'applications');

// Expose an HTTP server.
var server = new carcass.servers.Http();

server.mount('applications/cors');
server.mount('applications/restify');
server.mount('session', {
    store: new RedisStore({
        prefix: 'carcass-auth-example'
    })
});
server.mount('applications/testSession');

server.start(function() {
    console.log('server started at http://localhost:3000');
})

