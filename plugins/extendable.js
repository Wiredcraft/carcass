var carcass = require('carcass');
var util = require('util');

// Make it extendable.
module.exports = function(obj) {
    obj = obj || {};

    obj.extend = function(protoProps) {
        var parent = this;
        var child = function() {
            parent.apply(this, arguments);
        };

        // .
        carcass.mixable(child);

        // .
        child.mixin(parent);

        // .
        child.title && delete child.title;

        // Inherit.
        util.inherits(child, this);

        // Add prototype properties (instance properties) to the subclass, if
        // supplied.
        if (protoProps) child.prototype.mixin(protoProps);

        return child;
    };

    return obj;
};
