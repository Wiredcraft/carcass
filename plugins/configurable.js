// Make it configurable.
module.exports = function(obj) {
    obj || (obj = {});

    require('configurable')(obj);

    return obj;
};
