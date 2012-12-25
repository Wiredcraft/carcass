var carcass = require('carcass');
var should = require('should');
var request = require('request');

var server = require('./fixture').server;

describe('Restify express app', function() {
    before(function(done) {
        server.mount('applications/cors');
        server.mount('applications/restify');
        server.mount('applications/ipsum', '/restify');
        server.start(done);
    });

    after(function(done) {
        server.close(done);
    });

    describe('Test post requests', function() {
        it('should accept post requests', function(done) {
            request.post(
                'http://127.0.0.1:3000/restify/post',
                {'form' : {'key' : 'val'}},
                function(err, res) {
                    should.not.exist(err);
                    res.should.be.a('object');
                    res.should.have.property('statusCode', 200);
                    res.should.have.property('body');
                    var json = JSON.parse(res.body);
                    json.should.have.property('key', 'val');
                    setTimeout(done, 1);
            });
        });
    });

    describe('Test cookie', function() {
        it('should set cookie in response', function(done) {
            request.get(
                'http://127.0.0.1:3000/restify/cookie',
                function(err, res, body) {
                    should.not.exist(err);
                    res.should.be.a('object');
                    res.should.have.property('statusCode', 200);
                    res.should.have.property('headers');
                    res.headers.should.have.property('set-cookie');
                    setTimeout(done, 1);
            });
        });
    });
});
