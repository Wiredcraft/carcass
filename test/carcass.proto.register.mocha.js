var debug = require('debug')('carcass:test');

var carcass = require('carcass');
var should = require('should');

var path = require('path');
var root = path.resolve(__dirname, 'fixture');
var lorem = require(path.resolve(root, 'applications', 'lorem'));
var ipsum = require(path.resolve(root, 'applications', 'ipsum'));
var dolor = require(path.resolve(root, 'applications', 'dolor', 'lorem'));

describe('Carcass / proto / register:', function() {

    it('should be a proto.', function() {
        carcass.proto.should.have.property('register');
        carcass.proto.register.should.be.a('object');
    });

    describe('Use with a tree:', function() {
        var obj = carcass.mixable({
            lorem: 'lorem'
        });

        before(function() {
            obj.mixin(carcass.proto.register);
        });

        it('should have the method.', function() {
            obj.should.have.property('lorem', 'lorem');
            obj.should.have.property('register');
        });

        it('should have the content.', function() {
            obj.register(root, 'applications');
            obj.should.have.property('lorem', 'lorem');
            obj.should.not.have.property('dolor');
            obj.should.have.property('applications');
            obj.applications.should.be.a('object');
            obj.applications.should.have.property('lorem');
            obj.applications.lorem.should.equal(lorem);
            obj.applications.should.have.property('ipsum');
            obj.applications.ipsum.should.equal(ipsum);
            obj.applications.should.have.property('dolor');
            obj.applications.dolor.should.have.property('lorem');
            obj.applications.dolor.lorem.should.equal(dolor);
        });
    });

    describe('Use with a tree but no recursive:', function() {
        var obj = carcass.mixable({
            lorem: 'lorem',
            registerOptions: {
                noRecursive: true
            }
        });

        before(function() {
            obj.mixin(carcass.proto.register);
        });

        it('should have the content.', function() {
            obj.register(root, 'applications');
            obj.should.have.property('lorem', 'lorem');
            obj.should.not.have.property('dolor');
            obj.should.have.property('applications');
            obj.applications.should.be.a('object');
            obj.applications.should.have.property('lorem');
            obj.applications.lorem.should.equal(lorem);
            obj.applications.should.have.property('ipsum');
            obj.applications.ipsum.should.equal(ipsum);
            obj.applications.should.not.have.property('dolor');
        });
    });

    describe('Use with a folder:', function() {
        var obj = carcass.mixable({
            lorem: 'lorem'
        });

        before(function() {
            obj.mixin(carcass.proto.register);
        });

        it('should have the content.', function() {
            obj.register(root, 'applications', 'dolor');
            obj.should.have.property('lorem', 'lorem');
            obj.should.not.have.property('dolor');
            obj.should.have.property('applications');
            obj.applications.should.be.a('object');
            obj.applications.should.not.have.property('lorem');
            obj.applications.should.not.have.property('ipsum');
            obj.applications.should.have.property('dolor');
            obj.applications.dolor.should.have.property('lorem');
            obj.applications.dolor.lorem.should.equal(dolor);
            obj.applications.dolor.should.not.have.property('index');
            obj.applications.dolor.should.have.property('ipsum', 'not ipsum');
            obj.applications.dolor.should.have.property('dolor', 'dolor');
        });
    });

    describe('Use with a folder but disable index:', function() {
        var obj = carcass.mixable({
            lorem: 'lorem',
            registerOptions: {
                noIndex: true
            }
        });

        before(function() {
            obj.mixin(carcass.proto.register);
        });

        it('should have the content.', function() {
            obj.register(root, 'applications', 'dolor');
            obj.should.have.property('lorem', 'lorem');
            obj.should.not.have.property('dolor');
            obj.should.have.property('applications');
            obj.applications.should.be.a('object');
            obj.applications.should.not.have.property('lorem');
            obj.applications.should.not.have.property('ipsum');
            obj.applications.should.have.property('dolor');
            obj.applications.dolor.should.have.property('lorem');
            obj.applications.dolor.lorem.should.equal(dolor);
            obj.applications.dolor.should.not.have.property('index');
            obj.applications.dolor.should.have.property('ipsum', 'ipsum');
            obj.applications.dolor.should.not.have.property('dolor');
        });
    });

    describe('Use with more arguments:', function() {
        var obj = carcass.mixable({
            lorem: 'lorem'
        });

        before(function() {
            obj.mixin(carcass.proto.register);
        });

        it('should have the content.', function() {
            obj.register(path.resolve(root, 'applications'), 'dolor');
            obj.should.have.property('lorem', 'lorem');
            obj.should.not.have.property('applications');
            obj.should.have.property('dolor');
            obj.dolor.should.be.a('object');
            obj.dolor.should.have.property('lorem');
            obj.dolor.lorem.should.equal(dolor);
        });
    });

    describe('Use with only one argument:', function() {
        var obj = carcass.mixable({
            lorem: 'lorem'
        });

        before(function() {
            obj.mixin(carcass.proto.register);
        });

        it('should have the content.', function() {
            obj.register(path.resolve(root, 'applications'));
            obj.should.not.have.property('applications');
            obj.should.have.property('lorem');
            obj.lorem.should.equal(lorem);
            obj.should.have.property('ipsum');
            obj.ipsum.should.equal(ipsum);
            obj.should.have.property('dolor');
            obj.dolor.should.have.property('lorem');
            obj.dolor.lorem.should.equal(dolor);
        });
    });

    describe('Use with something wrong:', function() {
        var obj = carcass.mixable({
            lorem: 'lorem'
        });

        before(function() {
            obj.mixin(carcass.proto.register);
        });

        it('should fail silently.', function() {
            obj.register(root, 'applications', 'xxx');
            obj.should.have.property('lorem', 'lorem');
        });
    });
});
