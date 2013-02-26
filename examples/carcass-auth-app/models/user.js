var debug = require('debug')('carcass:example:auth:model');
var pass = require('pwd');
var carcass = require('carcass');
var path = require('path');

// Define storage
var storage = carcass.storages.memoray();

var builder = carcass.factories.Model({
    // Define model attributes
    attributes: {
	id : {},
        username : {},
	salt : {},
	hash : {}
    },
    // Define storage type (defined before)
    storage: storage,
    // Next are static methods
    hashPassword : function(user, cb) {
    	debug('Hashing password %s', user.attrs.password);

    	pass.hash(user.attrs.password, function(err, salt, hash){
    		user.attrs.salt = salt;
    		user.attrs.hash = hash;
    		delete user.attrs.password;
    		debug('Password succesfully hashed - salt = %s - hash = %s', salt, hash);
    		return cb();
    	});
    },
    loginUser : function(username, password, cb) {
    	debug('Looking for user %s %s', username, password);
    	this.storage.find({username : username}, function(err, user) {
    		if (!user) return cb({err:'Unknow user'}, null)
    		pass.hash(password, user.salt, function(err, hash){
    			if (user.hash == hash) return cb(null, user);
    			return cb(err, null);
    		});
	    return true;
    	});
    }
});

// Add the synchronization with database
// (without the plugin it doesnt work)
builder.use(carcass.plugins.modelSync);

module.exports = builder;
