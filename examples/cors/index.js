var carcass = require('carcass');
require('carcass-auth');

// Register applications.
carcass.register(__dirname, 'applications');

var server = new carcass.servers.Http();

server.mount('applications/cors');
server.mount('applications/restify');
server.mount('applications/session');
server.mount('applications/testSession');

server.start(function() {
    console.log('server started at http://localhost:3000');
});
