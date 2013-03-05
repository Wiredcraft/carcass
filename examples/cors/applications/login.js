var debug = require('debug')('carcass:Example:CORS:Application:Login');

var carcass = require('carcass');

module.exports = carcass.factories.Express({
    title: 'Login',
    initialize: initialize
});

function initialize(app, options) {
    debug('initializing');
    
    options = options || {};
    var passport = options.passport || carcass.instances.passport;
    
    var builder = carcass.models.model;
    
    var model = builder({
        id: 'id',
        name: 'name'
    });
    
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
            'page': 'index'
        });
    });

    app.post('/login', passport.authenticate([
        'local'
    ]), function(req, res, next) {
        res.json({
            'login': 'ok'
        });
    });

    app.post('/model', authMiddleware, function(req, res) {
        model.set({
            'id':   req.body.id,
            'name': req.body.name
        }).save(function(error) {
            error ? res.json({ error: error}) : res.json(model);
        });
    });
    
    app.get('/model', authMiddleware, function(req, res) {
       res.json(model); 
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