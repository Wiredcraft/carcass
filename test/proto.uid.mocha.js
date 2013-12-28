// var debug = require('debug')('carcass:test');

var mixable = require('../lib/mixable');
var uidProto = require('../lib/proto/uid');
var should = require('should');

describe('Carcass / proto / uid:', function() {

    it('should be a proto', function() {
        uidProto.should.be.a('object');
    });

    describe('Use:', function() {
        var obj = mixable();
        obj.mixin(uidProto);

        it('should have some methods', function() {
            obj.should.have.property('id');
        });

        it('should have a default id', function() {
            should.exist(obj.id());
        });

        it('should have a same default id', function() {
            obj.id().should.equal(obj.id());
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

        it('can use null and generates an id', function() {
            obj.id(null).should.equal(obj);
            should.exist(obj.id());
        });
    });
});
