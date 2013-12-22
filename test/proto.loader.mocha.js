// var debug = require('debug')('carcass:test');

var mixable = require('../lib/mixable');
var loaderProto = require('../lib/proto/loader');
var should = require('should');

describe('Carcass / proto / loader:', function() {

    it('should be a proto', function() {
        loaderProto.should.be.a('object');
    });

    describe('Use:', function() {
        var obj = mixable();
        obj.mixin(loaderProto);

        it('should have some methods', function() {
            obj.should.have.property('source');
            obj.should.have.property('parser');
            obj.should.have.property('reload');
        });

        it('cannot load without source', function() {
            should.equal(obj.reload(), null);
        });

        it('can add a source', function() {
            obj.source(1).should.equal(obj);
            obj.source().should.equal(1);
            obj.reload().should.equal(1);
        });

        it('can override the source', function() {
            obj.source(2).should.equal(obj);
            obj.source().should.equal(2);
            obj.reload().should.equal(2);
        });

        it('can use a parser', function() {
            function parser(num) {
                return num * 2;
            }
            obj.source(3).should.equal(obj);
            obj.parser(parser).should.equal(obj);
            obj.parser().should.equal(parser);
            obj.reload().should.equal(6);
        });

        it('can override the parser', function() {
            function parser(num) {
                return num * 3;
            }
            obj.source(3).should.equal(obj);
            obj.parser(parser).should.equal(obj);
            obj.parser().should.equal(parser);
            obj.reload().should.equal(9);
        });
    });
});
