var carcass = require('carcass');
var should = require('should');

require('./fixture');

describe('Plugins', function() {
    // TODO
    it('should be an object.', function(done) {
        carcass.should.have.property('plugins');
        done();
    });
});
