var carcass = require('carcass');
var configurable = require('configurable');
var eson = require('eson');
var _ = require('underscore');

// Make it configurable.
module.exports = function(obj) {
    obj = obj || {};

    carcass.mixable(obj);
    configurable(obj);

    // File config.
    obj.eson = eson;
    obj.parser = eson();

    obj.load = function(filepath) {
        var config = obj.parser.read(filepath);
        obj.settings && _.extend(obj.settings, config);
    };

    return obj;
};

// .
module.exports.configurable = configurable;
module.exports.eson = eson;
