var configurable = require('configurable');
var isObject = require('es5-ext/lib/Object/is-object');

/**
 * A simple wrap to `configurable`.
 * 
 * @see https://github.com/visionmedia/configurable.js
 * 
 * @param {Object}
 * @return {Object}
 */
module.exports = function(obj) {
    if (0 === arguments.length) obj = {};

    if (!isObject(obj)) return obj;

    return require('configurable')(obj);
};
