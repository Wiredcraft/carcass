// var debug = require('debug')('carcass:test');

// var should = require('should');
var carcass = require('../');

describe('Carcass', function() {

    it('should be an object', function() {
        carcass.should.be.type('object');
    });

    it('should have an id', function() {
        carcass.id().should.equal('global');
    });

    it('should have some methods', function() {
        carcass.should.have.property('mixable');
        carcass.should.have.property('mixin');
        carcass.should.have.property('register');
    });

    // TODO: more.
});
