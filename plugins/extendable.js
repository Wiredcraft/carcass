var carcass = require('../');
var isObject = require('es5-ext/lib/Object/is-object');

/**
 * Make it extendable.
 * 
 * A simple wrap to `carcass.helpers.extend()`.
 * 
 * @param {Object}
 * @return {Object}
 */
module.exports = function(obj) {
    if (0 === arguments.length) obj = {};

    if (!isObject(obj)) return obj;

    obj.extend = carcass.helpers.extend;

    return obj;
};
