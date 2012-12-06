var util = require('util');
var _ = require('underscore');

// .
module.exports = function(args) {
    return function(obj) {
        obj.extend = function(protoProps) {
            var parent = this;
            var child = function() {
                parent.apply(this, arguments);
            };

            // .
            _.extend(child, parent);

            // Inherit.
            util.inherits(child, this);

            // Add prototype properties (instance properties) to the subclass,
            // if supplied.
            if (protoProps) _.extend(child.prototype, protoProps);

            // TODO: better to delete before extending?
            child.title && delete child.title;

            return child;
        };
    };
};
