// var debug = require('debug')('carcass:test');

var carcass = require('..');
// var should = require('should');

describe('Plugin / stackable:', function() {

    it('should be a function.', function() {
        carcass.plugins.should.have.property('stackable');
        carcass.plugins.stackable.should.be.a('function');
    });

    it('should make an object stackable.', function() {
        var obj = {};
        carcass.plugins.stackable(obj).should.equal(obj);
        obj.should.be.a('object');
        obj.should.have.property('stack');
        obj.should.have.property('use');
    });

    it('should make a function stackable.', function() {
        var obj = function() {};
        carcass.plugins.stackable(obj).should.equal(obj);
        obj.should.be.a('function');
        obj.should.have.property('stack');
        obj.should.have.property('use');
    });

    it('should return an object without given arguments.', function() {
        var obj = carcass.plugins.stackable();
        obj.should.be.a('object');
        obj.should.have.property('stack');
        obj.should.have.property('use');
    });

    it('should not make a string stackable.', function() {
        var obj = 'lorem';
        carcass.plugins.stackable(obj).should.equal(obj);
        obj.should.be.a('string');
        obj.should.not.have.property('stack');
        obj.should.not.have.property('use');
    });

    describe('Use:', function() {
        var obj = carcass.plugins.stackable();

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
            obj.stack.should.eql(['lorem']);
        });

        it('should not share with another stack.', function() {
            var another = carcass.plugins.stackable();
            another.use('ipsum');
            another.stack.should.eql(['ipsum']);
            obj.stack.should.eql(['lorem']);
        });

        it('can add more layers.', function() {
            obj.use('ipsum');
            obj.stack.should.eql(['lorem', 'ipsum']);
        });
    });
});
