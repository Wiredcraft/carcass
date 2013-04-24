var debug = require('debug')('carcass:proto:register');

var slice = Array.prototype.slice;
var isObject = require('es5-ext/lib/Object/is-object');
var path = require('path');
var fs = require('fs');

module.exports = {
    register: register
};

/**
 * ...
 * 
 * @param root
 * @param *dir
 * @return {this}
 */
function register(root) {
    var self = this;
    slice.call(arguments, 1).forEach(function(dir) {});
    return self;
};
