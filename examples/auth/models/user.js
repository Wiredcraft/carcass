var debug = require('debug')('carcass:Example:Model:User');

var carcass = require('carcass');
var path = require('path');
var crypto = require('crypto');

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

builder.prototype.hashPassword = function(algorithm) {
    var supportHashes = ['md5', 'sha1', 'sha256', 'sha512'];
    
    algorithm = supportHashes.indexOf(algorithm) >= 0 
                    ? algorithm
                    : 'sha1';
    
    var sha =  crypto.createHash(algorithm)
                     .update(this.password())
                     .digest('hex');
                     
    // Update password.
    this.password(sha);
};

builder.use(carcass.plugins.modelSync);

module.exports = builder;
