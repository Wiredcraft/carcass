var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

// Make it an event emitter.
module.exports = function(args) {
    return function(obj) {
        if (!_.isFunction(obj)) return;
        // TODO: better to use descriptor?
        _.extend(obj.prototype, Object.create(EventEmitter.prototype));
    };
};
