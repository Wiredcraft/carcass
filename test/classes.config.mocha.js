// var debug = require('debug')('carcass:test');

// var should = require('should');
var path = require('path');
var eson = require('eson');

var Config = require('../lib/classes/Config');
var config = null;
var root = path.resolve(__dirname, 'fixture');
var lorem = path.resolve(root, 'configs', 'lorem.json');
var ipsum = path.resolve(root, 'configs', 'ipsum.json');

describe('Classes / Config:', function() {

    it('should be a function', function() {
        Config.should.be.type('function');
    });

    it('should return an object', function() {
        (new Config()).should.be.type('object');
    });

    it('should return a different instance', function() {
        (new Config()).should.not.equal(new Config());
    });

    describe('An instance:', function() {

        before(function() {
            config = new Config();
        });

        it('should be an object', function() {
            config.should.be.type('object');
        });

        it('should be mixable', function() {
            config.should.have.property('mixin');
            config.mixin.should.be.type('function');
        });

        it('should be a stack', function() {
            config.should.have.property('stack');
        });

        it('should have some methods', function() {
            config.should.have.property('reload');
            config.should.have.property('parser');
        });

        it('can stack a source', function() {
            config.stack(lorem).should.equal(config);
            config.stack().should.eql([lorem]);
        });

        it('can reload', function() {
            var res = config.reload();
            res.should.be.type('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', true);
            res.should.not.have.property('root');
        });

        it('can stack one more source', function() {
            config.stack(ipsum).should.equal(config);
            config.stack().should.eql([lorem, ipsum]);
        });

        it('can reload', function() {
            var res = config.reload();
            res.should.be.type('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', false);
            res.should.have.property('root', '{root}');
        });
    });

    describe('An instance with an initial source:', function() {

        before(function() {
            config = new Config(lorem);
        });

        it('can reload', function() {
            config.stack().should.eql([lorem]);
            var res = config.reload();
            res.should.be.type('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', true);
            res.should.not.have.property('root');
        });
    });

    describe('An instance with two initial sources:', function() {

        before(function() {
            config = new Config(lorem, ipsum);
        });

        it('can reload', function() {
            config.stack().should.eql([lorem, ipsum]);
            var res = config.reload();
            res.should.be.type('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', false);
            res.should.have.property('root', '{root}');
        });
    });

    describe('An instance with eson as the parser:', function() {

        before(function() {
            config = new Config(lorem, ipsum);
            var conf = eson().use(eson.replace('{root}', root));
            var parser = conf.read.bind(conf);
            config.parser(parser);
        });

        it('can reload', function() {
            config.stack().should.eql([lorem, ipsum]);
            var res = config.reload();
            res.should.be.type('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', false);
            res.should.have.property('root', root);
        });
    });
});
