var debug = require('debug')('carcass:Example:Model:User');

var carcass = require('carcass');
var path = require('path');

// Stash storage.
var storage = carcass.storages.stash({
    id: path.resolve(__dirname, '../stash')
});

var builder = carcass.factories.Model({
    attributes: {
        id: {},
        password: {}
    },
    storage: storage
});

builder.use(carcass.plugins.modelSync);

module.exports = builder;
