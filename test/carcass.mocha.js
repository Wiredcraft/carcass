var debug = require('debug')('carcass:test');

var carcass = require('carcass');
var should = require('should');

require('./fixture');

describe('Carcass', function() {
    it('should be an object with some methods', function() {
        carcass.should.be.a('object');
        carcass.should.have.property('mixable');
        carcass.should.have.property('mixin');
        carcass.should.have.property('register');
    });

    it('should have proto', function() {
        carcass.should.have.property('proto');
        carcass.proto.should.be.a('object');
    });

    // TODO
    it('should have some plugins', function() {
        carcass.should.have.property('plugins');
    });

    // TODO
    it('should have some applications', function() {
        carcass.should.have.property('applications');
    });

    // TODO
    it('should have some examples.', function() {
        carcass.should.have.property('examples');
        carcass.examples.should.have.property('proto');
    });

    // TODO: more.
});
