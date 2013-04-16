var carcass = require('carcass');
var should = require('should');

describe('Carcass / proto:', function() {

    it('should be an object.', function() {
        carcass.should.have.property('proto');
    });

    it('should have some proto.', function() {
        carcass.proto.should.have.property('mixin');
    });
});
