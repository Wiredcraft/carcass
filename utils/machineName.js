
// TODO: rebuild with promise.
module.exports = function(source, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    if (typeof source !== 'string') {
        // TODO
        callback(new Error());
        return;
    }
    var separator = options.separator || '_';
    if (typeof separator !== 'string' || separator.length > 1) {
        // TODO
        callback(new Error());
        return;
    }
    callback(null, source.toLowerCase().replace(
        new RegExp('[^a-z0-9\\' + separator + ']+', 'g'), separator));
};
