// var debug = require('debug')('carcass:test');

// var should = require('should');
var stacker = require('../lib/helpers/stacker');

describe('Carcass / helpers / stacker:', function() {

    it('should be a function', function() {
        stacker.should.be.type('function');
    });

    describe('Use with an object:', function() {

        var obj = {};

        before(function() {
            obj.lorem = stacker('_lorem');
        });

        it('should have an empty stack', function() {
            obj.lorem().should.eql([]);
        });

        it('can stack a value', function() {
            obj.lorem('lorem').should.equal(obj);
            obj.lorem().should.eql(['lorem']);
            obj._lorem.should.eql(['lorem']);
        });

        it('can stack another value', function() {
            obj.lorem('ipsum').should.equal(obj);
            obj.lorem().should.eql(['lorem', 'ipsum']);
            obj._lorem.should.eql(['lorem', 'ipsum']);
        });
    });

    describe('Use with an object:', function() {

        var obj = {};

        before(function() {
            obj.lorem = stacker('_lorem');
        });

        it('can stack a value', function() {
            obj.lorem('lorem').should.equal(obj);
            obj.lorem().should.eql(['lorem']);
            obj._lorem.should.eql(['lorem']);
        });
    });
});
