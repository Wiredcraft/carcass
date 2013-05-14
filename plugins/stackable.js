var carcass = require('..');
var isObject = require('es5-ext/lib/Object/is-object');

/**
 * A simple wrap/shortcut to carcass.proto.stack.
 * 
 * @param {Object}
 * @return {Object}
 */
module.exports = function(obj) {
    if (0 == arguments.length) obj = {};

    if (!isObject(obj)) return obj;

    carcass.mixable(obj);

    obj.stack = [];

    obj.mixin(carcass.proto.stack);

    return obj;
};
