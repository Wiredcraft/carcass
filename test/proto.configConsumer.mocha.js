// var debug = require('debug')('carcass:test');

var should = require('should');
var mixable = require('../lib/mixable');
var configProto = require('../lib/proto/configConsumer');

var Carcass = require('../lib/classes/Carcass');
var carcass = null;

var path = require('path');
var root = path.resolve(__dirname, 'fixture');
var lorem = path.resolve(root, 'configs', 'lorem.json');

describe('Carcass / proto / configConsumer:', function() {

    it('should be a proto', function() {
        configProto.should.be.a('object');
    });

    describe('Use:', function() {
        var obj = mixable();
        obj.mixin(configProto);
        carcass = new Carcass();

        it('should have some methods', function() {
            obj.should.have.property('configManager');
            obj.should.have.property('configName');
            obj.should.have.property('config');
        });

        it('cannot get config before init', function() {
            should.not.exist(obj.config());
        });

        it('can have a default manager', function() {
            obj.configManager().should.equal(require('../'));
        });

        it('can have a different manager', function() {
            obj.configManager(carcass).should.equal(obj);
            obj.configManager().should.equal(carcass);
        });

        it('can have constructor as the default name', function() {
            obj.configName().should.equal('Object');
        });

        it('can have id as the default name', function() {
            obj._id = 'lorem';
            obj.configName(null).should.equal(obj);
            obj.configName().should.equal('lorem');
        });

        it('can have a different name', function() {
            obj.configName('ipsum').should.equal(obj);
            obj.configName().should.equal('ipsum');
        });

        it('cannot get config before reload', function() {
            should.not.exist(obj.config());
            carcass.source(lorem).reload();
        });

        it('can get config with a good name', function() {
            obj.configName('lorem').should.equal(obj);
            obj.config().should.equal('ipsum');
        });

        it('can get config with a different name', function() {
            obj.configName('dolor').should.equal(obj);
            obj.config().should.equal(true);
        });

        it('cannot get config with a bad name', function() {
            obj.configName('xxx').should.equal(obj);
            should.not.exist(obj.config());
        });
    });
});
