var debug = require('debug')('carcass:Application:Lorem');

var carcass = require('carcass');

module.exports = carcass.factories.Express({
    initialize: function(app, options) {
        debug('initializing');

        app.get('/dolor', function(req, res, next) {
            res.send('Lorem ipsum dolor sit amet');
        });

        app.get('/options', function(req, res, next) {
            res.json(options);
        });

    }
});
