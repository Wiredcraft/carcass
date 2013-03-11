var debug = require('debug')('carcass:Example:AUTH:Application:Login');

var carcass = require('carcass');

module.exports = carcass.factories.Express({
    title: 'Login',
    initialize: initialize
});

function initialize(app, options) {
    debug('initializing');
    
    options = options || {};
    var passport = options.passport || carcass.instances.passport;
    
    // All paths require a session.
    app.use(function(req, res, next) {
        // Just a demo.
        if (!req.session) {
            next(new Error('no session'));
        } else {
            next();
        }
    });
    
    app.get('/', function(req, res) {
        res.json({
            'msg': 'welcome'
        });
    });

    app.post('/login', passport.authenticate([
        'local'
    ]), function(req, res, next) {
        res.json({
            'login': 'success'
        });
    });

    app.get('/logout', authMiddleware, function(req, res) {
        req.logout();
        res.json({
            'logout': 'ok'
        });
    });
    
    function authMiddleware(req, res, next)  {
        if (!req.user) {
            return res.status(403).json({ error: 'not log in' });
        }
        next();
    }
}
