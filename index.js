var Carcass = require('./lib/classes/Carcass');

// Export a global instance.
var carcass = module.exports = new Carcass('global');

// Register applications.
carcass.register(__dirname, 'applications');
