var debug = require('debug')('carcass:example:auth');
var carcass = require('carcass');
var express = require('express');



var LocalStrategy = require('passport-local').Strategy;
var passport = carcass.factories.Passport();

module.exports = carcass.factories.Express({
	title: 'Auth',
	initialize: initialize
});

passport.serializeUser(function(user, done) {
	done(null, user.salt);
});

passport.deserializeUser(function(salt, done) {
	var User = carcass.models.user;

	User.storage.find({salt : salt}, function(err, user) {
		return done(null, user);
	})
	
});

passport.use(new LocalStrategy(function(username, password, cb) {
	var User = carcass.models.user;

	User.loginUser(username, password, function(err, user) {
		if (err) return cb(err, null);
		return cb(null, user);
	})
}));

function initialize(app, options) {
	var User = carcass.models.user;	

	app.configure(function() {
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(passport.initialize());
		app.use(passport.session());

		app.use(express.session({ secret: 'thisisatest' }));
	});

	app.get('/', function(req, res) {
		res.send({success:true});
	})

	app.post('/login', passport.authenticate('local'), function(req, res, next) {
		res.send(req.user)
	});

	app.get('/logout', function(req, res) {
		req.logout();
		return res.send({success:true});
	})

	app.get('/whoami', function(req, res) {
		return res.send(req.user);
	});

	app.post('/register', function(req, res) {
		debug(req.body);

		var user = new User({username : req.body.username, password : req.body.password});
		User.hashPassword(user, function() {
			user.save(function() {
				return res.send(user);
			})
		});
		
	})
};





