var should = require('should');
var request = require('request');

var fixture = require('./fixture');

describe('Lorem, a simple application', function() {
    before(function(done) {
        fixture.start(done);
    });

    after(function(done) {
        fixture.close(done);
    });

    describe('Get /dolor', function() {
        it('should return the text', function(done) {
            request.get({
                uri: 'http://127.0.0.1:3000/dolor'
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.have.property('body', 'Lorem ipsum dolor sit amet');
                setTimeout(done, 1);
            });
        });
    });
});
