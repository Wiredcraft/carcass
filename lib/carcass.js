var debug = require('debug')('carcass:Core');

var path = require('path');
var fs = require('fs');

module.exports = function(obj) {
    obj || (obj = {});

    // Register every file in a dir plus a namespace.
    obj.register = require('./register')(obj);

    // Add a mixin() function to a target object.
    obj.mixable = require('./mixable')(obj);

    return obj;
};
