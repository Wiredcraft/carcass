var debug = require('debug')('carcass:application:dolor:lorem');

var carcass = require('carcass');

module.exports = carcass.factories.Express({
    initialize: initialize
});

function initialize(app, options) {
    debug('initializing');

    app.get('/', function(req, res, next) {
        res.send('Lorem ipsum dolor sit amet');
    });
}
