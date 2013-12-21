// var debug = require('debug')('carcass:test');

var carcass = require('..');
var should = require('should');

describe('Carcass / proto / loaderSync:', function() {

    it('should be a proto.', function() {
        carcass.proto.should.have.property('loaderSync');
        carcass.proto.loaderSync.should.be.a('object');
    });

    describe('Use:', function() {
        var obj = carcass.mixable();
        obj.mixin(carcass.proto.loaderSync);

        it('should have some methods.', function() {
            obj.should.have.property('source');
            obj.should.have.property('parser');
            obj.should.have.property('reload');
            obj.should.have.property('get');
        });

        it('cannot get without source.', function() {
            should.equal(obj.get(), null);
            should.equal(obj.reload(), null);
        });

        it('can add a source.', function() {
            obj.source(1).should.equal(obj);
            obj.source().should.equal(1);
            obj.get().should.equal(1);
            obj.reload().should.equal(1);
        });

        it('can override the source.', function() {
            obj.source(2).should.equal(obj);
            obj.source().should.equal(2);
            obj.get().should.equal(2);
            obj.reload().should.equal(2);
        });

        it('can use a parser.', function() {
            function parser(num) {
                return num * 2;
            }
            obj.source(3).should.equal(obj);
            obj.parser(parser).should.equal(obj);
            obj.parser().should.equal(parser);
            obj.get().should.equal(6);
            obj.reload().should.equal(6);
        });

        it('can override the parser.', function() {
            function parser(num) {
                return num * 3;
            }
            obj.source(3).should.equal(obj);
            obj.parser(parser).should.equal(obj);
            obj.parser().should.equal(parser);
            obj.get().should.equal(9);
            obj.reload().should.equal(9);
        });
    });

    // TODO: use with a cache.
});
