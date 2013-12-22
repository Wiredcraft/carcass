module.exports = function(obj) {
    if (0 === arguments.length) obj = {};

    // We do code reuse with a mixin method.
    obj.mixable = require('./mixable');

    // Carcass itself is also mixable.
    obj.mixable(obj);

    // Deferred is a promise implementation.
    // @see https://github.com/medikoo/deferred
    // TODO: tests?
    obj.deferred = require('./deferred');

    // Also a ready-to-use promise (resolved with the obj itself).
    // TODO: not so useful..
    obj.promise = obj.deferred(obj);

    // Postal.js is an in-memory message bus.
    // @see https://github.com/postaljs/postal.js
    obj.postal = require('./postal');

    // The register function.
    // Used to register a directory.
    // See `/index.js` for usage.
    obj.mixin(require('./proto/register'));

    // Register helpers.
    obj.register(__dirname, 'helpers');

    // Register proto.
    obj.register(__dirname, 'proto');

    // Register classes.
    obj.register(__dirname, 'classes');

    return obj;
};
