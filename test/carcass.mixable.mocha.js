// var debug = require('debug')('carcass:test');

var mixable = require('../lib/mixable');
var should = require('should');

describe('Carcass / mixable:', function() {

    it('should be a function', function() {
        mixable.should.be.a('function');
    });

    it('can return a mixable object without given arguments', function() {
        var lorem = mixable();
        lorem.should.be.a('object');
        lorem.should.have.property('mixin');
    });

    it('can make an object mixable', function() {
        var lorem = mixable({
            ipsum: true
        });
        lorem.should.be.a('object');
        lorem.should.have.property('ipsum', true);
        lorem.should.have.property('mixin');
    });

    it('can make an array mixable', function() {
        var lorem = mixable([
            'ipsum'
        ]);
        lorem.should.be.a('object');
        lorem.should.have.property(0, 'ipsum');
        lorem.should.have.property('length', 1);
        lorem.should.have.property('mixin');
    });

    it('can make a function mixable', function() {
        var lorem = mixable(function() {
            return true;
        });
        lorem.should.be.a('function');
        lorem().should.equal(true);
        lorem.should.have.property('mixin');
    });

    it('cannot make strings mixable', function() {
        var lorem = mixable('ipsum');
        lorem.should.be.a('string');
        lorem.should.equal('ipsum');
        lorem.should.not.have.property('mixin');
    });

    it('cannot make strings mixable', function() {
        var lorem = mixable('');
        lorem.should.be.a('string');
        lorem.should.equal('');
        lorem.should.not.have.property('mixin');
    });

    it('cannot make numbers mixable', function() {
        var lorem = mixable(1);
        lorem.should.be.a('number');
        lorem.should.equal(1);
        lorem.should.not.have.property('mixin');
    });

    it('cannot make numbers mixable', function() {
        var lorem = mixable(0);
        lorem.should.be.a('number');
        lorem.should.equal(0);
        lorem.should.not.have.property('mixin');
    });

    it('cannot make booleans mixable', function() {
        var lorem = mixable(true);
        lorem.should.be.a('boolean');
        lorem.should.equal(true);
        lorem.should.not.have.property('mixin');
    });

    it('cannot make booleans mixable', function() {
        var lorem = mixable(false);
        lorem.should.be.a('boolean');
        lorem.should.equal(false);
        lorem.should.not.have.property('mixin');
    });

    it('cannot make null mixable', function() {
        var lorem = mixable(null);
        should.not.exist(lorem);
    });

    it('cannot make undefined mixable', function() {
        var lorem = mixable(undefined);
        should.not.exist(lorem);
    });
});
