// var debug = require('debug')('carcass:test');

var should = require('should');
var mixable = require('../lib/mixable');
var configProto = require('../lib/proto/configManager');

var path = require('path');
var eson = require('eson');

var root = path.resolve(__dirname, 'fixture');
var lorem = path.resolve(root, 'configs', 'lorem.json');
var ipsum = path.resolve(root, 'configs', 'ipsum.json');

describe('Carcass / proto / configManager:', function() {

    it('should be a proto', function() {
        configProto.should.be.type('object');
    });

    describe('Use:', function() {
        var obj = mixable();
        obj.mixin(configProto);

        it('should have some methods', function() {
            obj.should.have.property('config');
            obj.should.have.property('source');
            obj.should.have.property('reload');
        });

        it('should not have settings before init', function() {
            should.not.exist(obj.settings);
        });

        it('can setup config', function() {
            obj.config().should.equal(obj);
            obj._config.should.be.type('object');
            obj.settings.should.be.type('object');
        });

        it('can use a source', function() {
            obj.source(lorem).should.equal(obj);
            obj._config.stack().should.eql([lorem]);
        });

        it('can reload', function() {
            obj.reload().should.be.type('object');
            obj.get('lorem').should.equal('ipsum');
            obj.get('dolor').should.equal(true);
            should.not.exist(obj.get('root'));
        });

        it('can use one more source', function() {
            obj.source(ipsum).should.equal(obj);
            obj._config.stack().should.eql([lorem, ipsum]);
        });

        it('can reload', function() {
            obj.reload().should.be.type('object');
            obj.get('lorem').should.equal('ipsum');
            obj.get('dolor').should.equal(false);
            obj.get('root').should.equal('{root}');
        });

        it ('can have different eson plugins', function() {
            obj.esonPlugins.should.be.type('function');
            obj.esonPlugins = function() {
                return [eson.replace('{root}', root)];
            };
        });

        it('can reload', function() {
            obj.config().should.equal(obj);
            obj.reload().should.be.type('object');
            obj.get('lorem').should.equal('ipsum');
            obj.get('dolor').should.equal(false);
            obj.get('root').should.equal(root);
        });
    });
});
