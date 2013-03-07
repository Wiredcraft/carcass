
// TODO: rebuild with promise.
module.exports = function(source, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    if (typeof source !== 'string') {
        // TODO
        callback(new Error('Cannot convert a non-string to a machine name'));
        return;
    }
    var separator = options.separator || '_';
    if (typeof separator !== 'string' || separator.length > 1) {
        // TODO
        callback(new Error('Separator must be a single character, like "_"'));
        return;
    }
    callback(null, source.toLowerCase().replace(
        new RegExp('[^a-z0-9\\' + separator + ']+', 'g'), separator));
};
