// var debug = require('debug')('carcass:test');

var should = require('should');

var Carcass = require('../lib/classes/Carcass');
var lorem = null;
var ipsum = null;

describe('Classes / Carcass:', function() {

    it('should be a function', function() {
        Carcass.should.be.type('function');
    });

    it('should return an object', function() {
        (new Carcass()).should.be.type('object');
    });

    it('should return a different instance', function() {
        (new Carcass()).should.not.equal(new Carcass());
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
            lorem.should.have.property('mixin');
            lorem.mixin.should.be.type('function');
        });

        it('should be a register', function() {
            lorem.should.have.property('register');
            lorem.register.should.be.type('function');
        });

        it('should be a config manager', function() {
            lorem.should.have.property('settings');
            lorem.settings.should.be.type('object');
            lorem.should.have.property('config');
            lorem.config.should.be.type('function');
            lorem.should.have.property('source');
            lorem.source.should.be.type('function');
            lorem.should.have.property('reload');
            lorem.reload.should.be.type('function');
        });

        it('should export some tools', function() {
            lorem.should.have.property('mixable');
            lorem.should.have.property('deferred');
            lorem.should.have.property('postal');
        });

        it('should export some classes', function() {
            lorem.should.have.property('classes');
            lorem.classes.should.have.property('Carcass');
            lorem.classes.should.have.property('Config');
            lorem.classes.should.have.property('Loader');
        });

        it('should export some helpers', function() {
            lorem.should.have.property('helpers');
            lorem.helpers.should.have.property('accessor');
            lorem.helpers.should.have.property('extend');
            lorem.helpers.should.have.property('mixin');
        });

        it('should export some proto', function() {
            lorem.should.have.property('proto');
            lorem.proto.should.have.property('channel');
            lorem.proto.should.have.property('configManager');
            lorem.proto.should.have.property('id');
            lorem.proto.should.have.property('loader');
            lorem.proto.should.have.property('register');
            lorem.proto.should.have.property('stack');
            lorem.proto.should.have.property('uid');
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
            ipsum.config.should.equal(lorem.config);
            ipsum.source.should.equal(lorem.source);
            ipsum.reload.should.equal(lorem.reload);
        });

        it('should not share the settings', function() {
            ipsum.settings.should.not.equal(lorem.settings);
            ipsum.set('dolor', true).should.equal(ipsum);
            ipsum.get('dolor').should.equal(true);
            should.not.exist(lorem.get('dolor'));
        });

        it('should not share the configs', function() {
            ipsum._config.should.not.equal(lorem._config);
        });

        it('can override the methods', function() {
            ipsum.esonPlugins.should.equal(lorem.esonPlugins);
            ipsum.esonPlugins = function() {
                return [];
            };
            ipsum.esonPlugins.should.not.equal(lorem.esonPlugins);
            ipsum.esonPlugins.should.not.eql(lorem.esonPlugins);
        });
    });
});
