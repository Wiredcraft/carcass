var accessor = require('../helpers/accessor');

/**
 * Simply add a layer to the stack.
 *
 * @param layer
 *
 * @return {this}
 */
module.exports = {
    stack: accessor('_stack', {
        getDefault: function() {
            return [];
        },
        pre: function(value) {
            var _stack = this._stack || [];
            _stack.push(value);
            return _stack;
        }
    })
};
