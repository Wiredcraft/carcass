var carcass = require('carcass');
var should = require('should');
var request = require('request');
var path = require('path');
var fs = require('fs');

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

        it('should accept multipart requests', function(done) {
            var r = request.post({
                uri: 'http://127.0.0.1:3000/restify/multipart',
                json: true
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.have.property('body');
                body.should.have.property('field', 'val');
                body.should.have.property('filename', path.basename(__filename));
                setTimeout(done, 1);
            });

            var form = r.form();
            form.append('field', 'val');
            form.append('file', fs.createReadStream(__filename));
        });
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

        it ('should be able to parse custom cookie data', function(done) {
            var randomVal = parseInt(Math.random() * 10000).toString();
            request.get({
                uri: 'http://127.0.0.1:3000/restify/random-cookie',
                json: true,
                headers: { cookie: 'key='+randomVal }
            }, function(err, res, body) {
                should.not.exist(err);
                res.should.be.a('object');
                res.should.have.property('statusCode', 200);
                res.should.have.property('body');
                res.body.should.have.property('key', randomVal);
                setTimeout(done, 1);
            });
        });
    });
});
