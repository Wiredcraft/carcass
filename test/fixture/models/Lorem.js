var Model = require('carcass').constructors.Model.extend({
    lorem: 'ipsum'
});

Model.prototype.initialize = function() {
// Model.super_.prototype.initialize.apply(this, arguments);
};

module.exports = Model;
