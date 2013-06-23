var carcass = require('../');
var isObject = require('es5-ext/lib/Object/is-object');

/**
 * .
 */
module.exports = function(obj) {
    if (0 === arguments.length) obj = {};

    if (!isObject(obj)) return obj;

    obj.extend = carcass.helpers.extend;

    return obj;
};
