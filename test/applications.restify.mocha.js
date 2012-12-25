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
            request.post({
                uri: 'http://127.0.0.1:3000/restify/post',
                json: true,
                form: {
                    'key': 'val'
                }
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.have.property('body');
                body.should.have.property('key', 'val');
                setTimeout(done, 1);
            });
        });

        // TODO: test bodyParser with multipart post.
    });

    describe('Test cookie', function() {
        it('should set cookie in response', function(done) {
            request.get({
                uri: 'http://127.0.0.1:3000/restify/cookie',
                json: true
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.have.property('headers');
                res.headers.should.have.property('set-cookie');
                setTimeout(done, 1);
            });
        });

        // TODO: test cookieParser with custom cookie data.
    });
});
