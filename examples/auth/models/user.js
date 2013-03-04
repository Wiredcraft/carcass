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

    verifyPassword: function(id, password, done) {
      // debug('Looking for user %s %s', username, password);
      this.storage.get({id : id}, function(err, user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!passwordHash.verify(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }    
});


builder.use(carcass.plugins.modelSync);

module.exports = builder;
