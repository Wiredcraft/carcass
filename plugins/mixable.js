var debug = require('debug')('carcass:Plugin:Mixable');

var carcass = require('carcass');
var isObject = require('es5-ext/lib/Object/is-object');

/**
 * Add a mixin() function to a target object.
 * 
 * @param {object}
 * @return {object}
 */
module.exports = function mixable(obj) {
    if (0 == arguments.length) obj = {};

    // Do not override the mixin function, even it is not mine.
    if (!isObject(obj) || obj.mixin) return obj;

    // Recursively make the prototypes mixable.
    if (obj.prototype) mixable(obj.prototype);

    // The common mixin.
    obj.mixin = carcass.proto.mixin.bind(obj);

    return obj;
};
