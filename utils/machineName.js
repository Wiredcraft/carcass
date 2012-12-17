var _ = require('underscore');

// .
module.exports = function(source, options, callback) {
    if (_.isFunction(options)) {
        callback = options;
        options = {};
    }
    if (!_.isString(source)) {
        // TODO
        callback(new Error());
        return;
    }
    var separator = options.separator || '_';
    if (!_.isString(separator) || separator.length > 1) {
        // TODO
        callback(new Error());
        return;
    }
    callback(null, source.toLowerCase().replace(
        new RegExp('[^a-z0-9\\' + separator + ']+', 'g'), separator));
};
