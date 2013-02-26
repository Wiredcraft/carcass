// Dependencies
// ---

// Carcass.
var carcass = require('carcass');

// Auth.
require('carcass-auth');

// Components
// ---

// Register models.
carcass.register(__dirname, 'models');

// Register applications.
carcass.register(__dirname, 'applications');

// Configuration?
// ---