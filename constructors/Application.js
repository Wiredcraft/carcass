var debug = require('debug')('carcass:Application');

var express = require('express');

module.exports = Application;

// Application is just an Express application.
function Application(options) {
    debug('initializing %s.', this.constructor.title);
    this.mixin(express());
    this.initialize.apply(this, arguments);
};

// Initialize is an empty function by default. Override it with your own
// initialization logic.
Application.prototype.initialize = function() {};
