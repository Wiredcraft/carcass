// var debug = require('debug')('carcass:test');

var should = require('should');

var Carcass = require('../lib/classes/Carcass');
var lorem = null;
var ipsum = null;

describe('Classes / Carcass:', function() {

    it('should be a class', function() {
        Carcass.should.be.type('function');
        (new Carcass()).should.be.type('object');
    });

    describe('An instance:', function() {

        before(function() {
            lorem = new Carcass('lorem');
        });

        it('should be an object', function() {
            lorem.should.be.type('object');
        });

        it('should have an id', function() {
            lorem.id().should.equal('lorem');
        });

        it('should be mixable', function() {
            lorem.should.have.property('mixin').with.type('function');
        });

        it('should be a register', function() {
            lorem.should.have.property('register').with.type('function');
        });

        it('should export some tools', function() {
            lorem.should.have.property('mixable').with.type('function');
            lorem.should.have.property('highland').with.type('function');
            lorem.should.have.property('postal').with.type('object');
        });

        it('should export some classes', function() {
            lorem.should.have.property('classes').with.type('object');
            lorem.classes.should.have.property('Carcass').with.type('function');
            lorem.classes.should.have.property('Loader').with.type('function');
        });

        it('should export some helpers', function() {
            lorem.should.have.property('helpers').with.type('object');
            lorem.helpers.should.have.property('accessor').with.type('function');
            lorem.helpers.should.have.property('mixin').with.type('function');
            lorem.helpers.should.have.property('stacker').with.type('function');
        });

        it('should export some proto', function() {
            lorem.should.have.property('proto').with.type('object');
            lorem.proto.should.have.property('channel').with.type('object');
            lorem.proto.should.have.property('id').with.type('object');
            lorem.proto.should.have.property('loader').with.type('object');
            lorem.proto.should.have.property('register').with.type('object');
            lorem.proto.should.have.property('uid').with.type('object');
        });

        it('should export methods from es5-ext', function() {
            lorem.should.have.property('Array').with.type('object');
            lorem.should.have.property('Boolean').with.type('object');
            lorem.should.have.property('Date').with.type('object');
            lorem.should.have.property('Error').with.type('object');
            lorem.should.have.property('Function').with.type('object');
            lorem.should.have.property('Math').with.type('object');
            lorem.should.have.property('Number').with.type('object');
            lorem.should.have.property('Object').with.type('object');
            lorem.should.have.property('RegExp').with.type('object');
            lorem.should.have.property('String').with.type('object');
        });
    });

    describe('Another instance:', function() {

        before(function() {
            ipsum = new Carcass('ipsum');
        });

        it('should be a different object', function() {
            ipsum.should.be.type('object');
            ipsum.should.not.equal(lorem);
        });

        it('should have an id', function() {
            ipsum.id().should.equal('ipsum');
        });

        it('should share some prototypes', function() {
            ipsum.mixin.should.equal(lorem.mixin);
            ipsum.register.should.equal(lorem.register);
        });
    });
});