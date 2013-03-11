var deferred = require('carcass').deferred;

module.exports = function(source, options) {
    options = options || {};
    var result;
    var separator = options.separator || '_';
    if (typeof source !== 'string') {
        result = new Error('Cannot convert a non-string to a machine name');
    } else if (typeof separator !== 'string' || separator.length > 1) {
        result = new Error('Separator must be a single character, like "_"');
    } else {
        result = source.toLowerCase().replace(
            new RegExp('[^a-z0-9\\' + separator + ']+', 'g'), separator);
    }
    return deferred(result);
};
