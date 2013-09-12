/**
 * Example of ...
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
    if (0 === arguments.length) return this._id;
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
