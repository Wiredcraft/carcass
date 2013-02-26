// Dependencies
// ---

process.env.DEBUG = 'carcass:example:*';
// Carcass.
var carcass = require('carcass');

// Auth.
require('carcass-auth');
require('carcass-memoray');
// Components
// ---

// Register models.
carcass.register(__dirname, 'models');
// Register applications.
carcass.register(__dirname, 'applications');

var server = new carcass.servers.Http();


server.mount('applications/auth');

server.start(function() {
    console.log('server started at http://localhost:3000');
});
