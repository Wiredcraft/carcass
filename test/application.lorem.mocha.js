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
        it('should return 404', function(done) {
            request.get({
                uri: 'http://127.0.0.1:3000/dolor'
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 404);
                setTimeout(done, 1);
            });
        });
    });

    describe('Get /lorem/dolor', function() {
        it('should return the text', function(done) {
            request.get({
                uri: 'http://127.0.0.1:3000/lorem/dolor'
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.have.property('body', 'Lorem ipsum dolor sit amet');
                setTimeout(done, 1);
            });
        });
    });

    describe('HEAD /lorem/dolor', function() {
        it('should return the headers', function(done) {
            request.head({
                uri: 'http://127.0.0.1:3000/lorem/dolor',
                headers: {
                    Origin: 'http://lorem.ipsum'
                }
            },
                function(err, res, body) {
                    should.not.exist(err);
                    res.should.be.a('object');
                    res.should.have.property('statusCode', 200);
                    res.should.not.have.property('body');
                    res.should.have.property('headers');
                    res.headers.should.be.a('object');
                    res.headers.should.have
                        .property('access-control-allow-origin');
                    res.headers.should.have
                        .property('access-control-allow-methods');
                    res.headers.should.have
                        .property('access-control-allow-headers');
                    res.headers.should.have.property('content-type');
                    res.headers.should.have.property('content-length');
                    setTimeout(done, 1);
                });
        });
    });

    describe('OPTIONS /lorem/dolor', function() {
        it('should return only a GET in the body', function(done) {
            request({
                method: 'OPTIONS',
                uri: 'http://127.0.0.1:3000/lorem/dolor',
                headers: {
                    Origin: 'http://lorem.ipsum'
                }
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.have.property('body', 'GET');
                setTimeout(done, 1);
            });
        });
    });
});
