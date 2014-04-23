// var debug = require('debug')('carcass:test');

// var should = require('should');
var mixable = require('../lib/mixable');
var registerProto = require('../lib/proto/register');

var path = require('path');
var root = path.resolve(__dirname, 'fixture');
var lorem = require(path.resolve(root, 'files', 'lorem'));
var ipsum = require(path.resolve(root, 'files', 'ipsum'));
var dolor = require(path.resolve(root, 'files', 'dolor'));

describe('Carcass / proto / register:', function() {

    it('should be a proto', function() {
        registerProto.should.be.type('object');
    });

    describe('Use:', function() {
        var obj = mixable({
            lorem: 'lorem'
        });

        before(function() {
            obj.mixin(registerProto);
        });

        it('should have the method', function() {
            obj.should.have.property('lorem', 'lorem');
            obj.should.have.property('register');
        });

        it('should have the content', function() {
            obj.register(root, 'files');
            obj.should.have.property('lorem', 'lorem');
            obj.should.not.have.property('ipsum');
            obj.should.not.have.property('dolor');
            obj.should.have.property('files').with.type('object');
            obj.files.should.have.property('lorem').equal(lorem);
            obj.files.should.have.property('ipsum').equal(ipsum);
            obj.files.should.have.property('dolor').equal(dolor);
        });
    });

    describe('Use with more arguments:', function() {
        var obj = mixable({
            lorem: 'lorem'
        });

        before(function() {
            obj.mixin(registerProto);
        });

        it('should have the content', function() {
            obj.register(root, 'files', 'dolor');
            obj.should.have.property('lorem', 'lorem');
            obj.should.not.have.property('ipsum');
            obj.should.not.have.property('dolor');
            obj.should.have.property('files').with.type('object');
            obj.files.should.have.property('dolor').equal(dolor);
            obj.files.should.not.have.property('lorem');
            obj.files.should.not.have.property('ipsum');
        });
    });

    describe('Use with only one argument:', function() {
        var obj = mixable({
            lorem: 'lorem'
        });

        before(function() {
            obj.mixin(registerProto);
        });

        it('should have the content', function() {
            obj.register(path.resolve(root, 'files'));
            obj.should.have.property('lorem', 'lorem');
            obj.should.not.have.property('ipsum');
            obj.should.not.have.property('dolor');
            obj.should.have.property('files').with.type('object');
            obj.files.should.have.property('lorem').equal(lorem);
            obj.files.should.have.property('ipsum').equal(ipsum);
            obj.files.should.have.property('dolor').equal(dolor);
        });
    });

    describe('Use with something wrong:', function() {
        var obj = mixable({
            lorem: 'lorem'
        });

        before(function() {
            obj.mixin(registerProto);
        });

        it('should fail silently', function() {
            obj.register(root, 'files', 'xxx');
            obj.should.have.property('lorem', 'lorem');
            obj.should.have.property('files').with.type('object');
            obj.files.should.not.have.property('lorem');
            obj.files.should.not.have.property('ipsum');
            obj.files.should.not.have.property('dolor');
            obj.files.should.not.have.property('xxx');
        });
    });

    describe('Extend with another register:', function() {
        var obj = mixable({
            lorem: 'lorem'
        });
        var another = mixable({});

        before(function() {
            obj.mixin(registerProto);
            another.mixin(registerProto);
        });

        it('should have the content', function() {
            another.register(path.resolve(root, 'files'));
            obj.should.have.property('lorem', 'lorem');
            obj.should.not.have.property('files');
            obj.extend(another, 'files');
            obj.should.have.property('files').with.type('object');
            obj.files.should.have.property('lorem').equal(lorem);
            obj.files.should.have.property('ipsum').equal(ipsum);
            obj.files.should.have.property('dolor').equal(dolor);
        });
    });

});
