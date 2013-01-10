var debug = require('debug')('carcass-auth:test:Application:TestSession');

var carcass = require('carcass');

module.exports = carcass.factories.Express(function(app, options) {
    debug('initializing');

    app.use(function(req, res, next) {
        if (!req.session) {
            next(new Error('no session'));
        } else {
            next();
        }
    });
    app.get('/', function(req, res, next) {
        res.json(req.session || false, 200);
    });
    app.get('/id', function(req, res, next) {
        res.json(req.sessionID || false, 200);
    });
    app.get('/destroy', function(req, res, next) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            }
            if (req.session) {
                return next(new Error('failed to destroy'));
            }
            res.json(true, 200);
        });
    });
});