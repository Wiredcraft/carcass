/**
 * Example of a simple accessor.
 * 
 * Mixin this so your object/instance can have an ID, and in case no ID is
 * provided with the options, it will generate a random id with `uid`.
 */

var uid = require('uid');

module.exports = {
    id: id
};

/**
 * Accessor.
 */
function id(options) {
    // Getter.
    if (0 === arguments.length) {
        if (!this._id) this._id = uid();
        return this._id;
    }
    // The argument can be either an object or just the ID.
    if ('object' !== typeof options) {
        options = {
            id: options
        };
    }
    // Default to a random unique ID.
    if (!options.id) options.id = uid();
    // Setter.
    this._id = options.id;
    return this;
}
