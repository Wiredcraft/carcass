var debug = require('debug')('carcass:test');

var carcass = require('carcass');
var should = require('should');

describe('Carcass / proto / stack:', function() {
    var obj = carcass.mixable();
    obj.mixin(carcass.proto.stack);

    it('should have a stack.', function() {
        obj.should.have.property('stack');
        obj.stack.should.eql([]);
    });

    it('should have a use method.', function() {
        obj.should.have.property('use');
        obj.use.should.be.a('function');
    });

    it('can add a layer.', function() {
        obj.use('lorem');
        obj.stack.should.eql([
            'lorem'
        ]);
    });
});
