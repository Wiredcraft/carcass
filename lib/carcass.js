var debug = require('debug')('carcass:Core');

module.exports = function(obj) {
    obj || (obj = {});

    // Express is a web application framework.
    // @see http://expressjs.com/
    obj.express = require('./express');

    // TODO: expose Underscore?

    // Deferred is a promise implementation.
    // @see https://github.com/medikoo/deferred
    // TODO: tests?
    obj.deferred = require('./deferred');

    // Also a ready-to-use promise (resolved with the obj itself).
    // TODO: use cases / examples?
    obj.promise = obj.deferred(obj);

    // Promise Flow.
    obj.promiseFlow = require('./promiseFlow');

    // The register function.
    // Used to register a directory.
    // See `/index.js` for usage.
    obj.register = require('./register')(obj);

    return obj;
};
