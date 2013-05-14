var debug = require('debug')('carcass:test');

var carcass = require('..');
var should = require('should');

describe('Carcass / proto / stack:', function() {
    var obj = carcass.mixable({
        stack: []
    });
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

    it('should not share with another stack.', function() {
        var another = carcass.mixable({
            stack: []
        });
        another.mixin(carcass.proto.stack);
        another.use('ipsum');
        another.stack.should.eql([
            'ipsum'
        ]);
        obj.stack.should.eql([
            'lorem'
        ]);
    });

    it('can add more layers.', function() {
        obj.use('ipsum');
        obj.stack.should.eql([
            'lorem',
            'ipsum'
        ]);
    });
});
