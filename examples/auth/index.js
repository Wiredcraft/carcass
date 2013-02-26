// Dependencies
var express = require('express')
  , routes = require('./routes')
  , login = require('./routes/login')
  , http = require('http')
  , passwordHash = require('password-hash')
  , passport = require('passport')
  , flash = require('connect-flash')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , path = require('path');


  // here's the users object with plain-text password
var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

//hash original plain-text password with the passwordHash method
for(var i=0; i< users.length; i++) {
   users[i].password = passwordHash.generate(users[i].password);
}


function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }

        if (!passwordHash.verify(password, user.password)) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

// Carcass.
var carcass = require('carcass');

// Auth.
require('carcass-auth');

// Components
// ---

// Register models.
carcass.register(__dirname, 'models');

// Register applications.
// carcass.register(__dirname, 'applications');

// Configuration?

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: 'my secret'}));
  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
})

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/login', login.login);
app.get('/user', function(req, res){
  res.send('Welcome ' + req.user.username + '. And your login email is ' + req.user.email + '');
});
app.post('/login',
  passport.authenticate('local', { successRedirect: '/user',
                                   failureRedirect: '/login',
                                   failureFlash: true  })
);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

