var debug = require('debug')('carcass:test');

var carcass = require('carcass');
var should = require('should');
var path = require('path');
var eson = require('eson');

var config = null;
var root = path.resolve(__dirname, 'fixture');
var lorem = path.resolve(root, 'configs', 'lorem.json');
var ipsum = path.resolve(root, 'configs', 'ipsum.json');

describe('Tools / config:', function() {

    it('should be a function.', function() {
        carcass.tools.should.have.property('config');
        carcass.tools.config.should.be.a('function');
    });

    it('should return a function.', function() {
        carcass.tools.config().should.be.a('function');
    });

    it('should return a different instance.', function() {
        carcass.tools.config().should.not.eql(carcass.tools.config());
    });

    describe('An instance:', function() {

        before(function() {
            config = carcass.tools.config();
        });

        it('should be a function.', function() {
            config.should.be.a('function');
        });

        it('should be mixable.', function() {
            config.should.have.property('mixin');
            config.mixin.should.be.a('function');
        });

        it('should be a stack.', function() {
            config.should.have.property('stack');
            config.should.have.property('use');
        });

        it('should have some methods.', function() {
            config.should.have.property('reload');
            config.should.have.property('parser');
        });

        it('can use a source.', function() {
            config.use(lorem).should.have.property('stack');
            config.stack.should.eql([lorem]);
        });

        it('can reload.', function() {
            var res = config.reload();
            res.should.be.a('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', true);
            res.should.not.have.property('root');
        });

        it('can use one more source.', function() {
            config.use(ipsum).should.have.property('stack');
            config.stack.should.eql([lorem, ipsum]);
        });

        it('can reload.', function() {
            var res = config.reload();
            res.should.be.a('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', false);
            res.should.have.property('root', '{root}');
        });
    });

    describe('An instance with an initial source:', function() {

        before(function() {
            config = carcass.tools.config(lorem);
        });

        it('can reload.', function() {
            config.stack.should.eql([lorem]);
            var res = config.reload();
            res.should.be.a('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', true);
            res.should.not.have.property('root');
        });
    });

    describe('An instance with two initial sources:', function() {

        before(function() {
            config = carcass.tools.config(lorem, ipsum);
        });

        it('can reload.', function() {
            config.stack.should.eql([lorem, ipsum]);
            var res = config.reload();
            res.should.be.a('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', false);
            res.should.have.property('root', '{root}');
        });
    });

    describe('An instance with eson as the parser:', function() {

        before(function() {
            config = carcass.tools.config(lorem, ipsum);
            var conf = eson().use(eson.replace('{root}', root));
            var parser = conf.read.bind(conf);
            config.parser(parser);
        });

        it('can reload.', function() {
            config.stack.should.eql([lorem, ipsum]);
            var res = config.reload();
            res.should.be.a('object');
            res.should.have.property('lorem', 'ipsum');
            res.should.have.property('dolor', false);
            res.should.have.property('root', root);
        });
    });
});
