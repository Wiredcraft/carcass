var express = require('express');
var _ = require('underscore');
var debug = require('debug')('carcass:Application');

module.exports = Application;

// Application is just an Express application.
function Application(attributes, options) {
    debug('initializing %s.', this.constructor.title);
    _.extend(this, express());
    this.initialize.apply(this, arguments);
};

// Initialize is an empty function by default. Override it with your own
// initialization logic.
Application.prototype.initialize = function() {};
