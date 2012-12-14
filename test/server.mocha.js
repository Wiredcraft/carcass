var carcass = require('carcass');
var should = require('should');

var server = require('./fixture').server;

describe('Server', function() {
    it('should be an object with some methods.', function(done) {
        server.should.be.a('object');
        server.should.have.property('getPlugin');
        server.should.have.property('mount');
        server.should.have.property('start');
        server.should.have.property('close');
        done();
    });

    it('should be able to load a plugin.', function(done) {
        var Lorem = carcass.applications.Lorem;
        server.getPlugin('Lorem').should.equal(Lorem);
        server.getPlugin('applications/Lorem').should.equal(Lorem);
        done();
    });

    it('should be able to mount a plugin.', function(done) {
        // TODO
        done();
    });
});
