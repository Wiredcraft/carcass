var debug = require('debug')('carcass:Core');

module.exports = function(obj) {
    obj || (obj = {});

    // We do code reuse with a mixin method.
    obj.mixable = require('./mixable');

    // Carcass itself is also mixable.
    obj.mixable(obj);

    // Express is a web application framework.
    // @see http://expressjs.com/
    obj.express = require('./express');

    // TODO: expose es5-ext?

    // Deferred is a promise implementation.
    // @see https://github.com/medikoo/deferred
    // TODO: tests?
    obj.deferred = require('./deferred');

    // Also a ready-to-use promise (resolved with the obj itself).
    // TODO: not so useful..
    obj.promise = obj.deferred(obj);

    // Promise Flow.
    // obj.promiseFlow = require('./promiseFlow');

    // Postal.js is an in-memory message bus.
    // @see https://github.com/postaljs/postal.js
    obj.postal = require('./postal');

    // The register function.
    // Used to register a directory.
    // See `/index.js` for usage.
    obj.register = require('./register')(obj);

    // Register proto.
    obj.register(__dirname, 'proto');

    return obj;
};
