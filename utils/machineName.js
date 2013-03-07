
// TODO: rebuild with promise.
module.exports = function(source, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    if (typeof source !== 'string') {
        // TODO
        callback(new Error('source must a string'));
        return;
    }
    var separator = options.separator || '_';
    if (typeof separator !== 'string' || separator.length > 1) {
        // TODO
        callback(new Error('separator must a character such like _%&'));
        return;
    }
    callback(null, source.toLowerCase().replace(
        new RegExp('[^a-z0-9\\' + separator + ']+', 'g'), separator));
};
