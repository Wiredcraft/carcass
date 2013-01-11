var debug = require('debug')('carcass-auth:test:Application:TestSession');

var carcass = require('carcass');

module.exports = carcass.factories.Express(function(app, options) {
    debug('initializing');

    app.get('/', function(req, res) {
        res.json({'page': 'index'});
    });;
    
    app.get('/login', function(req, res) {
        req.session.login = true;
        return res.json({'login': 'ok'});
    });
    
    app.get('/member', function(req, res) {
        if (req.session && req.session.login) {
            res.json({'login': true});
        } else {
            res.json({'login': false});
        }
    });
    
    app.get('/logout', function(req, res) {
        delete req.session.login;
        return res.json({'logout':'ok'})
    });
});