// var debug = require('debug')('carcass:test');

var mixable = require('../lib/mixable');
var uidProto = require('../lib/proto/uid');
var should = require('should');

describe('Carcass / proto / uid:', function() {

    it('should be a proto', function() {
        uidProto.should.be.type('object');
    });

    describe('Use:', function() {
        var obj = mixable();
        obj.mixin(uidProto);

        it('should have some methods', function() {
            obj.should.have.property('id');
        });

        it('should not have the internal value by default', function() {
            should.not.exist(obj._id);
        });

        it('should have a default id', function() {
            should.exist(obj.id());
            should.exist(obj._id);
        });

        it('should have a same default id', function() {
            obj.id().should.equal(obj.id());
        });

        it('should not generate a new id', function() {
            obj.id().should.equal(obj._id);
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

        it('can use undefined and generates a new id', function() {
            var id = obj.id();
            obj.id(undefined).should.equal(obj);
            should.exist(obj._id);
            obj.id().should.equal(obj._id);
            obj.id().should.not.equal(id);
        });

        it('can use null and generates a new id', function() {
            var id = obj.id();
            obj.id(null).should.equal(obj);
            should.exist(obj._id);
            obj.id().should.equal(obj._id);
            obj.id().should.not.equal(id);
        });

        it('can use an empty option and generates a new id', function() {
            var id = obj.id();
            obj.id({}).should.equal(obj);
            should.exist(obj._id);
            obj.id().should.equal(obj._id);
            obj.id().should.not.equal(id);
        });
    });
});
