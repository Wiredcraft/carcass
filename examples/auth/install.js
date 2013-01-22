var debug = require('debug')('carcass:Example:Install');

var carcass = require('carcass');

require('./index');

var User = carcass.models.user;

User.storage.install(function(err) {
    if (err) return debug(err);
    User({
        id: 'root',
        password: 'test'
    }).save(function(err) {
        if (err) return debug(err);
    });
});
