var debug = require('debug')('carcass:test');

var carcass = require('carcass');
var should = require('should');

describe('Carcass / proto / postal:', function() {

    it('should be a proto.', function() {
        carcass.proto.should.have.property('postal');
        carcass.proto.postal.should.be.a('object');
    });

    describe('...:', function() {
        var obj = carcass.mixable();

        before(function() {
            obj.mixin(carcass.proto.postal);
        });

        it('should ...', function() {
            obj.should.have.property('_postal');
            obj.should.have.property('channel');
            obj.should.not.have.property('_channel');
        });

        it('should ...', function() {
            obj.channel('lorem');
            obj.should.have.property('_channel');
        });
    });
});
