var carcass = require('carcass');
require('carcass-auth');
var LocalStrategy = require('passport-local').Strategy;

// Register applications.
carcass.register(__dirname, 'applications');

// Register models.
carcass.register(__dirname, 'models');

// Generate some fake data
var User = carcass.models.user;

var user = new User({
    id: 'root',
    password: 'test'
});

User.hashPassword(user, function() {
    user.save();
});

// init a server
var server = new carcass.servers.Http();

var passport = carcass.factories.Passport();

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
    
passport.deserializeUser(function(id, done) {
    done(null, user)
});
    
passport.use('local', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: false
}, function(username, password, done) {
    User.storage.get({id : username}, function(err, user) {
        if (err) return done(err, null);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!User.verifyPassword(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}));

server.mount('applications/cors');
server.mount('applications/restify');
server.mount('applications/session');

server.mount('passport', {
    passport: passport
});

server.mount('passportSession', {
    passport: passport
});

server.mount('applications/login', {
    passport: passport
});

server.start(function() {
    console.log('server started at http://localhost:3000');
});
