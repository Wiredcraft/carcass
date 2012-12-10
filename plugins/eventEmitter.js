var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

// Make it an event emitter.
module.exports = function(args) {
    return function(obj) {
        if (!_.isFunction(obj)) return;
        obj.prototype.mixin(EventEmitter.prototype);
    };
};
