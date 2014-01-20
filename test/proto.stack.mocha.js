// var debug = require('debug')('carcass:test');

var mixable = require('../lib/mixable');
var stackProto = require('../lib/proto/stack');
// var should = require('should');

describe('Carcass / proto / stack:', function() {
    var obj = mixable();
    obj.mixin(stackProto);

    it('should not have a stack', function() {
        obj.should.not.have.property('_stack');
    });

    it('should have a stack method', function() {
        obj.should.have.property('stack');
        obj.stack.should.be.type('function');
    });

    it('can have a default stack', function() {
        obj.should.have.property('stack');
        obj.stack().should.eql([]);
    });

    it('can add a layer', function() {
        obj.stack('lorem');
        obj.stack().should.eql([
            'lorem'
        ]);
    });

    it('should not share with another stack', function() {
        var another = mixable({});
        another.mixin(stackProto);
        another.stack('ipsum');
        another.stack().should.eql([
            'ipsum'
        ]);
        obj.stack().should.eql([
            'lorem'
        ]);
    });

    it('can add more layers', function() {
        obj.stack('ipsum');
        obj.stack().should.eql([
            'lorem',
            'ipsum'
        ]);
    });
});
