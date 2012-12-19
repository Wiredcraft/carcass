var carcass = require('carcass');
var should = require('should');

require('./fixture');

// TODO
describe('Factories / Express', function() {
    it('should be an object.', function(done) {
        carcass.factories.should.have.property('Express');
        done();
    });
});
