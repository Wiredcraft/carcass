// var debug = require('debug')('carcass:test');

var mixable = require('../lib/mixable');
var idProto = require('../lib/proto/id');
var should = require('should');

describe('Carcass / proto / id:', function() {

    it('should be a proto', function() {
        idProto.should.be.a('object');
    });

    describe('Use:', function() {
        var obj = mixable();
        obj.mixin(idProto);

        it('should have some methods', function() {
            obj.should.have.property('id');
        });

        it('should not have a default id', function() {
            should.not.exist(obj.id());
        });

        it('can have an id', function() {
            obj.id(1).should.equal(obj);
            obj.id().should.equal(1);
        });

        it('can have a different id', function() {
            obj.id(2).should.equal(obj);
            obj.id().should.equal(2);
        });

        it('can use an option contains an id', function() {
            obj.id({
                id: 1
            }).should.equal(obj);
            obj.id().should.equal(1);
        });

        it('can use an option with a different id', function() {
            obj.id({
                id: 2
            }).should.equal(obj);
            obj.id().should.equal(2);
        });

        it('should throw with a bad argument', function() {
            (function() {
                obj.id(null);
            }).should.throwError();
        });
    });
});
