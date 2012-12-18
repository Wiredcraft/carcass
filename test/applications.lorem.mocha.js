var carcass = require('carcass');
var should = require('should');
var request = require('request');

var server = require('./fixture').server;

describe('Lorem, a simple application', function() {
    before(function(done) {
        server.mount('applications/cors');
        server.mount('applications/restify');
        server.mount('applications/lorem', '/lorem', {
            lorem: 'ipsum'
        });
        server.start(done);
    });

    after(function(done) {
        server.close(done);
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

    describe('Get /lorem/options', function() {
        it('should return the options', function(done) {
            request.get({
                uri: 'http://127.0.0.1:3000/lorem/options',
                json: true
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                body.should.eql({
                    lorem: 'ipsum'
                });
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
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.not.have.property('body');
                res.should.have.property('headers');
                var headers = res.headers;
                headers.should.be.a('object');
                headers.should.have.property('access-control-allow-origin');
                headers.should.have.property('access-control-allow-methods');
                headers.should.have.property('access-control-allow-headers');
                headers.should.have.property('content-type');
                headers.should.have.property('content-length');
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
                // res.should.have.property('body', 'GET');
                setTimeout(done, 1);
            });
        });
    });
});
