var debug = require('debug')('carcass:Example:Model:User');

var carcass = require('carcass');
var path = require('path');
var passwordHash = require('password-hash');

// Stash storage.
var storage = carcass.storages.stash({
    id: path.resolve(__dirname, '../stash')
});

var builder = carcass.factories.Model({
    attributes: {
        id: {},
        password: {}
    },
    storage: storage,
    hashPassword: function() {
      if (!this.password) {
        throw new Error('password missing');        
      } else {
        this.password = passwordHash.generate(this.password);  
      }
    }
});


builder.use(carcass.plugins.modelSync);

module.exports = builder;
