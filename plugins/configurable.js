var configurable = require('configurable');

// Make it configurable.
module.exports = function(obj) {
    obj || (obj = {});

    configurable(obj);

    return obj;
};

// .
module.exports.configurable = configurable;
