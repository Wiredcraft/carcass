// var debug = require('debug')('carcass:test');

var carcass = require('..');
// var should = require('should');

describe('Plugin / configurable:', function() {

    it('should be a function.', function() {
        carcass.plugins.should.have.property('configurable');
        carcass.plugins.configurable.should.be.a('function');
    });

    it('should make an object configurable.', function() {
        var obj = {};
        carcass.plugins.configurable(obj).should.equal(obj);
        obj.should.be.a('object');
        obj.should.have.property('settings');
    });

    it('should make a function configurable.', function() {
        var obj = function() {};
        carcass.plugins.configurable(obj).should.equal(obj);
        obj.should.be.a('function');
        obj.should.have.property('settings');
    });

    it('should return an object without given arguments.', function() {
        var obj = carcass.plugins.configurable();
        obj.should.be.a('object');
        obj.should.have.property('settings');
    });

    it('should not make a string configurable.', function() {
        var obj = 'lorem';
        carcass.plugins.configurable(obj).should.equal(obj);
        obj.should.be.a('string');
        obj.should.not.have.property('settings');
    });
});
