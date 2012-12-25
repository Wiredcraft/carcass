var carcass = require('carcass');

module.exports = carcass.factories.Express(function(app, options) {

    app.post('/post', function(req, res, next) {
        res.send(req.body);
    });

    app.get('/cookie', function(req, res, next) {
        res.cookie('cookie', 'cookie');
        res.send();
    });

});
