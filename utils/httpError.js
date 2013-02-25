var debug = require('debug')('carcass:Util:HttpError');

var http = require('http');
var util = require('util');

var codes = http.STATUS_CODES;

// HTTP Error
// ---
// Concrete factory; returns an instance.

// TODO: examples.
module.exports = function(status, message) {
    // If the first argument is not a valid status code, it is used as the
    // message, and the second argument is omitted.
    if (!status || 'number' != (typeof status) || !codes[status]) {
        message = status;
        status = 500;
    }

    // The message can be an error object.
    var err = util.isError(message) ? message : new Error();

    // Name is always set to this.
    err.name = 'HTTP Error';

    // Don't override status code if it's already there.
    err.status = err.status || status;

    // Prefix message with the status code.
    // Don't override message if it's already there.
    // Use HTTP status description if no message is given.
    err.message = util.format('%s %s', err.status, err.message || message ||
        codes[status]);

    return err;
};
