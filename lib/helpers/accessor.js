var validValue = require('es5-ext/lib/Object/valid-value');

/**
 * @return {Function} an accessor
 */
module.exports = function accessor(key, options) {

    validValue(key);

    /**
     * 3 options available.
     *
     * @optional getDefault: can be used to provide a default value when there's
     *   no value set already.
     * @optional pre: can be used to do whatever before the value is set. Note
     *   that if it presents, the return value will be used.
     * @optional post: can be used to do whatever after the value is set.
     */
    options = options || {};

    /**
     * A simple accessor.
     *
     * Use it with an argument to set a value, and use without any argument to
     *   retrieve the value.
     *
     * @return {value|this} depends on you are getting or setting
     */
    return function(value) {
        if (!arguments.length) {
            if (this[key] == null && options.getDefault) {
                this[key] = options.getDefault.call(this);
            }
            return this[key];
        }
        if (options.pre) value = options.pre.call(this, value);
        this[key] = value;
        if (options.post) options.post.call(this, value);
        return this;
    };
};
