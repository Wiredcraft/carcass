var debug = require('debug')('carcass:promiseFlow');

var deferred = require('./deferred');

// PromiseFlow
// ---
// ...

// Returns a function, which can be used directly, or as a layer in another
// promiseFlow.

// TODO: comments.

module.exports = function() {
    function promiseFlow(value) {
        return promiseFlow.handle(value);
    }

    promiseFlow.use = use;

    promiseFlow.handle = handle;

    promiseFlow.stack = [];

    for ( var i = 0; i < arguments.length; ++i) {
        promiseFlow.use(arguments[i]);
    }

    return promiseFlow;
};

function use(layer) {
    this.stack.push(layer);
    return this;
};

function handle(value) {
    var def = deferred();

    try {
        // TODO: what should be the default value?
        var promise = deferred(value || true);
        // TODO: ways to break out.
        this.stack.forEach(function(layer) {
            promise = promise.then(layer);
        });
        def.resolve(promise);
    } catch (e) {
        def.resolve(e);
    }

    return def.promise;
};
