// var debug = require('debug')('carcass:Example:Install');

var carcass = require('carcass');

var User = carcass.models.user;

User.storage.install(function(err) {
    if (err) return debug(err);
    User({
        id: 'root',
        password: 'test'
    }).hashPassword(function(data) {
      // console.log(data);
      user.save(function() {
        return res.send(data);
      });
    });
});
