var carcass = require('carcass');
var should = require('should');

require('./fixture');

describe('Utils', function() {
    // TODO
    it('should be an object.', function(done) {
        carcass.should.have.property('utils');
        done();
    });
});
