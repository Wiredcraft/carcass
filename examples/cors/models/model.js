var debug = require('debug')('carcass:Model:Dolor');

var carcass = require('carcass');

// Memory storage.
var storage = carcass.storages.memory({
    id: 'model'
});

var builder = carcass.factories.Model({
    attributes: {
        id: {},
        name: {}
    },
    storage: storage
});

builder.use(carcass.plugins.modelSync);

module.exports = builder;
