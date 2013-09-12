/**
 * Example of a simple accessor.
 * 
 * Mixin this so your object/instance can have an ID.
 */

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
    // ID cannot be a false value.
    if (!options.id) return false;
    // Setter.
    this._id = options.id;
    return this;
}
