var carcass = require('carcass');
var should = require('should');

var server = require('./fixture').server;

describe('Server', function() {
    it('should be an object with some methods.', function(done) {
        server.should.be.a('object');
        server.should.have.property('getApplication');
        server.should.have.property('mount');
        server.should.have.property('start');
        server.should.have.property('close');
        done();
    });

    it('should be able to load a plugin.', function(done) {
        var lorem = carcass.applications.lorem;
        server.getApplication('applications/lorem').should.equal(lorem);
        done();
    });

    it('should be able to mount a plugin.', function(done) {
        // TODO
        done();
    });
});
