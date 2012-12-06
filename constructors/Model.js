var debug = require('debug')('carcass:Model');

module.exports = Model;

// TODO
function Model(attributes, options) {
    debug('initializing %s.', this.constructor.title);
    this.initialize.apply(this, arguments);
};

// Initialize is an empty function by default. Override it with your own
// initialization logic.
Model.prototype.initialize = function() {};
