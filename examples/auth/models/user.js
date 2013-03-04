// var debug = require('debug')('carcass:Example:Model:User');

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

    hashPassword: function(user, done) {
      if (!user.attrs.password) {
        return done({ message: 'Password Missing' });
      } else {
        user.attrs.password = passwordHash.generate(user.attrs.password);
        done({ message: 'Password Hashed'});
      }
    },

    verifyPassword: function(password, hashedPassword) {
      // debug('Looking for user %s %s', username, password);
        return passwordHash.verify(password, hashedPassword);
    }    
});


builder.use(carcass.plugins.modelSync);

module.exports = builder;
