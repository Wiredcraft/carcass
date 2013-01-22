var carcass = require('carcass');
require('carcass-auth');
var LocalStrategy = require('passport-local').Strategy;

// Register applications.
carcass.register(__dirname, 'applications');

// Register models.
carcass.register(__dirname, 'models');

var server = new carcass.servers.Http();

var passport = carcass.factories.Passport();

passport.serializeUser(function(user, done) {
    done(null, user);
});
    
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
    
passport.use('local', new LocalStrategy({
    usernameField:     'username',
    passwordField:     'password',
    passReqToCallback: false
}, function(username, password, done) {
    done(null, {
        username: 'root',
        email:    'root@example.com'
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
