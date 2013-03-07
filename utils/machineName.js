var deferred = require('deferred');
// TODO: rebuild with promise.
module.exports = function(source, options, callback) {
    if (!options) {
        options = {};
    }
    var def = deferred();
    var separator = options.separator || '_';
    if (typeof source !== 'string') {
        // TODO
        def.resolve(new Error('Cannot convert a non-string to a machine name'));
    } else if (typeof separator !== 'string' || separator.length > 1) {
        // TODO
        def.resolve(new Error('Separator must be a single character, like "_"'));
    } else{
        def.resolve(source.toLowerCase().replace(
            new RegExp('[^a-z0-9\\' + separator + ']+', 'g'), separator));
    }
    return def.promise;
};
